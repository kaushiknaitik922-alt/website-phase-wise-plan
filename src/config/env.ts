import { z } from 'zod'

/**
 * Central env loader. Nothing else in the codebase reads process.env directly.
 *
 * Required keys are only *enforced* when the feature that needs them runs, so a
 * missing Resend key never takes the whole site down — it just disables the
 * email notification and is reported loudly in the logs.
 */
const schema = z.object({
  DATABASE_URI: z.string().min(1).optional(),
  PAYLOAD_SECRET: z.string().min(16).optional(),
  NEXT_PUBLIC_SERVER_URL: z.string().url().optional(),
  BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  ENQUIRY_TO_EMAIL: z.email().optional(),
  ENQUIRY_FROM_EMAIL: z.string().min(1).optional(),
  NEXT_PUBLIC_WHATSAPP_PRIMARY: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_SECONDARY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

/**
 * Hosting dashboards happily store a variable with an empty or padded value.
 * Treat those as "not set" rather than letting a stray space fail validation
 * (or, worse, get parsed as part of a connection string).
 */
const read = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

const parsed = schema.safeParse({
  // Vercel's Neon integration injects DATABASE_URL; accept either name so the
  // connection works whether it was set by hand or by the integration.
  DATABASE_URI: read(process.env.DATABASE_URI) ?? read(process.env.DATABASE_URL),
  PAYLOAD_SECRET: read(process.env.PAYLOAD_SECRET),
  NEXT_PUBLIC_SERVER_URL: read(process.env.NEXT_PUBLIC_SERVER_URL),
  BLOB_READ_WRITE_TOKEN: read(process.env.BLOB_READ_WRITE_TOKEN),
  RESEND_API_KEY: read(process.env.RESEND_API_KEY),
  ENQUIRY_TO_EMAIL: read(process.env.ENQUIRY_TO_EMAIL),
  ENQUIRY_FROM_EMAIL: read(process.env.ENQUIRY_FROM_EMAIL),
  NEXT_PUBLIC_WHATSAPP_PRIMARY: read(process.env.NEXT_PUBLIC_WHATSAPP_PRIMARY),
  NEXT_PUBLIC_WHATSAPP_SECONDARY: read(process.env.NEXT_PUBLIC_WHATSAPP_SECONDARY),
  NODE_ENV: read(process.env.NODE_ENV),
})

if (!parsed.success) {
  console.error('[env] invalid environment variables:', z.treeifyError(parsed.error))
  throw new Error('Invalid environment variables — check .env.local against .env.example')
}

export const env = parsed.data

/** Keys the CMS + database need to run at all. */
export const CMS_ENV_KEYS = ['DATABASE_URI', 'PAYLOAD_SECRET'] as const

export const hasDatabase = Boolean(env.DATABASE_URI && env.PAYLOAD_SECRET)
export const hasBlobStorage = Boolean(env.BLOB_READ_WRITE_TOKEN)
export const hasEmail = Boolean(env.RESEND_API_KEY && env.ENQUIRY_TO_EMAIL && env.ENQUIRY_FROM_EMAIL)

/** Absolute site URL, used for canonical links, sitemap and OG tags. */
export const serverUrl =
  env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export function requireEnv<K extends keyof typeof env>(key: K): NonNullable<(typeof env)[K]> {
  const value = env[key]
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${String(key)}`)
  }
  return value as NonNullable<(typeof env)[K]>
}
