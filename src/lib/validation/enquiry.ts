import { z } from 'zod'

/**
 * One schema, used by the form in the browser and again on the server. The
 * server never trusts the client-side pass.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name')
    .max(80, 'Name is too long'),
  companyName: z.string().trim().max(120, 'Company name is too long').optional().or(z.literal('')),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, 'Enter a 10-digit Indian mobile number'),
  email: z.union([z.email('Enter a valid email address'), z.literal('')]).optional(),
  productInterest: z.string().trim().max(120).optional().or(z.literal('')),
  quantity: z.string().trim().max(80, 'Quantity is too long').optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little about your requirement')
    .max(2000, 'Message is too long'),
  source: z.enum(['contact-page', 'product-page']).default('contact-page'),
  /** Honeypot — real people never see this field, bots fill it in. */
  website: z.string().max(0, 'Submission rejected').optional().or(z.literal('')),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>

export const flattenIssues = (error: z.ZodError<EnquiryInput>): EnquiryFieldErrors => {
  const errors: EnquiryFieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !errors[key as keyof EnquiryInput]) {
      errors[key as keyof EnquiryInput] = issue.message
    }
  }
  return errors
}
