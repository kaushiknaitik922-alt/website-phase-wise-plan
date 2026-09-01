import 'server-only'

import { Resend } from 'resend'

import { env, hasEmail } from '@/config/env'

let client: Resend | null = null

const getClient = (): Resend | null => {
  if (!hasEmail) return null
  client ??= new Resend(env.RESEND_API_KEY!)
  return client
}

export const sendEnquiryEmail = async ({
  subject,
  html,
  text,
  replyTo,
}: {
  subject: string
  html: string
  text: string
  replyTo?: string
}): Promise<{ sent: boolean; error?: string }> => {
  const resend = getClient()

  if (!resend) {
    // The lead is already saved in the database; email is a notification on
    // top of that, so a missing key must not fail the submission.
    console.warn('[email] Resend is not configured — enquiry saved without an email notification.')
    return { sent: false, error: 'email-not-configured' }
  }

  try {
    const result = await resend.emails.send({
      from: env.ENQUIRY_FROM_EMAIL!,
      to: env.ENQUIRY_TO_EMAIL!,
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    })

    if (result.error) {
      console.error('[email] Resend rejected the message:', result.error)
      return { sent: false, error: result.error.message }
    }

    return { sent: true }
  } catch (error) {
    console.error('[email] Failed to send enquiry notification:', error)
    return { sent: false, error: 'send-failed' }
  }
}
