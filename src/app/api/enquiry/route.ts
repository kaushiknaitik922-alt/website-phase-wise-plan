import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

import { env } from '@/config/env'
import { checkRateLimit } from '@/lib/rate-limit'
import { enquirySchema, flattenIssues } from '@/lib/validation/enquiry'
import { productEnquiryMessage, whatsappHref } from '@/lib/whatsapp'
import { enquiryEmail } from '@/server/email/enquiry-template'
import { sendEnquiryEmail } from '@/server/email/resend'
import { getPayloadClient } from '@/server/payload'
import { getProducts, getSiteSettings } from '@/server/queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const clientIp = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

/** Stored hashed, never in the clear — it only exists for spam control. */
const hashIp = (ip: string): string =>
  createHash('sha256')
    .update(`${ip}:${env.PAYLOAD_SECRET ?? 'no-secret'}`)
    .digest('hex')
    .slice(0, 32)

export async function POST(request: Request) {
  let payloadBody: unknown

  try {
    payloadBody = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  const parsed = enquirySchema.safeParse(payloadBody)

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', errors: flattenIssues(parsed.error) },
      { status: 400 },
    )
  }

  const enquiry = parsed.data

  // Honeypot: hidden field, only ever filled in by bots.
  if (enquiry.website) {
    return NextResponse.json({ ok: false, message: 'Submission rejected.' }, { status: 400 })
  }

  const ipHash = hashIp(clientIp(request))
  const { allowed, retryAfterSeconds } = checkRateLimit(ipHash)

  if (!allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Too many enquiries from this connection. Please call us instead.',
      },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
    )
  }

  const [settings, products] = await Promise.all([getSiteSettings(), getProducts()])
  const product = products.find((item) => item.slug === enquiry.productInterest)

  // 1. Save the lead first — it is the part that must not be lost.
  let saved = false
  const payload = await getPayloadClient()

  if (payload) {
    try {
      await payload.create({
        collection: 'enquiries',
        overrideAccess: true,
        data: {
          name: enquiry.name,
          companyName: enquiry.companyName || undefined,
          phone: enquiry.phone,
          email: enquiry.email || undefined,
          productInterest:
            product && typeof product.id === 'number' ? product.id : undefined,
          quantity: enquiry.quantity || undefined,
          message: enquiry.message,
          status: 'new',
          source: enquiry.source,
          ipHash,
        },
      })
      saved = true
    } catch (error) {
      console.error('[enquiry] Could not save the enquiry:', error)
    }
  }

  // 2. Notify by email.
  const { subject, html, text } = enquiryEmail(enquiry, product?.title)
  const email = await sendEnquiryEmail({
    subject,
    html,
    text,
    replyTo: enquiry.email || undefined,
  })

  if (!saved && !email.sent) {
    console.error('[enquiry] Enquiry was neither saved nor emailed.')
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not record your enquiry just now. Please call or WhatsApp us — we will pick up straight away.',
      },
      { status: 503 },
    )
  }

  // 3. Hand back a WhatsApp link so the buyer can carry on the conversation.
  const whatsappNumber = settings.whatsappPrimary || settings.phonePrimary
  const whatsappUrl = whatsappHref(
    whatsappNumber,
    productEnquiryMessage(settings.companyName, product?.title),
  )

  return NextResponse.json({ ok: true, whatsappUrl })
}
