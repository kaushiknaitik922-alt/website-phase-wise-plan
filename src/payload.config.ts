import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Enquiries } from './collections/Enquiries'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { HomePage } from './globals/HomePage'
import { ProcessPage } from './globals/ProcessPage'
import { SiteSettings } from './globals/SiteSettings'
import { WorkingHours } from './globals/WorkingHours'
import { env, hasBlobStorage, serverUrl } from './config/env'
import { site } from './config/site'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

if (env.NODE_ENV === 'production') {
  const missing = (['DATABASE_URI', 'PAYLOAD_SECRET'] as const).filter((key) => !env[key])
  if (missing.length) {
    const message = `Missing required environment variables: ${missing.join(', ')}`
    // A build can be produced without secrets (they are injected at deploy
    // time), but a running production server must never start without them.
    if (isBuildPhase) console.warn(`[payload] ${message}`)
    else throw new Error(message)
  }
}

/**
 * Local development can run without a database configured — the CMS simply
 * fails to connect and the public site falls back to its default content.
 * Production refuses to start without real values (checked above).
 */
const connectionString = env.DATABASE_URI ?? 'postgres://localhost:5432/shri_lakhdatar_dev'
const secret = env.PAYLOAD_SECRET ?? 'development-only-secret-not-for-production'

export default buildConfig({
  serverURL: serverUrl,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ` · ${site.companyName}`,
      robots: 'noindex, nofollow',
    },
  },
  collections: [Users, Media, Products, Enquiries],
  globals: [SiteSettings, WorkingHours, HomePage, AboutPage, ProcessPage, ContactPage],
  editor: lexicalEditor(),
  secret,
  db: postgresAdapter({
    pool: { connectionString },
    push: env.NODE_ENV !== 'production',
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'types/payload-types.ts') },
  graphQL: { disable: true },
  plugins: [
    ...(hasBlobStorage
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { [Media.slug]: true },
            token: env.BLOB_READ_WRITE_TOKEN!,
          }),
        ]
      : []),
  ],
})
