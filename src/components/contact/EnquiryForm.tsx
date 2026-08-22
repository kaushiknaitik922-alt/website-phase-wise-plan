'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import {
  enquirySchema,
  flattenIssues,
  type EnquiryFieldErrors,
  type EnquiryInput,
} from '@/lib/validation/enquiry'

type ProductOption = { slug: string; title: string }

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'error'; message: string }
  | { state: 'success'; whatsappUrl?: string }

const emptyForm = {
  name: '',
  companyName: '',
  phone: '',
  email: '',
  productInterest: '',
  quantity: '',
  message: '',
  website: '',
}

export function EnquiryForm({
  products,
  defaultProduct,
  thankYouMessage,
  source = 'contact-page',
}: {
  products: ProductOption[]
  defaultProduct?: string
  thankYouMessage: string
  source?: EnquiryInput['source']
}) {
  const [values, setValues] = useState({ ...emptyForm, productInterest: defaultProduct ?? '' })
  const [errors, setErrors] = useState<EnquiryFieldErrors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const update = (field: keyof typeof values) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Same schema as the server, so most mistakes are caught before the round trip.
    const parsed = enquirySchema.safeParse({ ...values, source })

    if (!parsed.success) {
      setErrors(flattenIssues(parsed.error))
      setStatus({ state: 'idle' })
      return
    }

    setStatus({ state: 'submitting' })

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const result = (await response.json()) as {
        ok: boolean
        message?: string
        errors?: EnquiryFieldErrors
        whatsappUrl?: string
      }

      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors)
        setStatus({
          state: 'error',
          message: result.message ?? 'Something went wrong. Please call us instead.',
        })
        return
      }

      setValues({ ...emptyForm, productInterest: defaultProduct ?? '' })
      setStatus({ state: 'success', whatsappUrl: result.whatsappUrl })
    } catch {
      setStatus({
        state: 'error',
        message: 'We could not reach the server. Please call or WhatsApp us instead.',
      })
    }
  }

  if (status.state === 'success') {
    return (
      <div className="rounded-lg border border-green/30 bg-green/5 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green text-white">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-navy">Enquiry sent</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">{thankYouMessage}</p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {status.whatsappUrl ? (
            <a
              href={status.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-dark"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Continue on WhatsApp
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => setStatus({ state: 'idle' })}
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    )
  }

  const submitting = status.state === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>

        <Field label="Company name" htmlFor="companyName" error={errors.companyName}>
          <Input
            id="companyName"
            name="companyName"
            autoComplete="organization"
            value={values.companyName}
            onChange={update('companyName')}
            invalid={Boolean(errors.companyName)}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" required error={errors.phone} hint="We reply on call or WhatsApp.">
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label="Product" htmlFor="productInterest" error={errors.productInterest}>
          <Select
            id="productInterest"
            name="productInterest"
            value={values.productInterest}
            onChange={update('productInterest')}
            invalid={Boolean(errors.productInterest)}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.title}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Quantity"
          htmlFor="quantity"
          error={errors.quantity}
          hint="For example: 500 kg per month"
        >
          <Input
            id="quantity"
            name="quantity"
            value={values.quantity}
            onChange={update('quantity')}
            invalid={Boolean(errors.quantity)}
          />
        </Field>
      </div>

      <Field label="Your requirement" htmlFor="message" required error={errors.message}>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={update('message')}
          invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Colour, grade, quantity, delivery location — whatever you already know."
        />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update('website')}
        />
      </div>

      {status.state === 'error' ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {status.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send enquiry'}
          {submitting ? null : <Icon name="arrow-right" className="h-4 w-4" />}
        </Button>
        <p className="text-xs text-muted">We use your details only to reply to this enquiry.</p>
      </div>
    </form>
  )
}
