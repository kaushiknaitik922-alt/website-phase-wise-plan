# Shri Lakhdatar Industries — website

B2B website for a plastic manufacturing and recycling unit in Sector 5, Bawana,
New Delhi: recycled PP granules, HDPE sheets and RO filter housing bottles.

Built to the plan in [`docs/PLAN.md`](docs/PLAN.md). Information still needed
from the client is listed in [`docs/QUESTIONS.md`](docs/QUESTIONS.md).

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| CMS | Payload 3, running inside the same Next.js app |
| Database | PostgreSQL (Neon) via `@payloadcms/db-postgres` |
| Media | Vercel Blob |
| Email | Resend |
| Styling | Tailwind CSS with brand tokens as CSS variables |
| Validation | Zod, shared between browser and server |
| Hosting | Vercel |

## Pages

```
/                                       Home
/about                                  About Us
/products                               Products hub
/products/pp-granules                   Recycled PP Granules
/products/hdpe-sheets                   HDPE Sheets
/products/ro-filter-housing-bottles     RO Filter Housing Bottles
/process                                Our Process
/contact                                Contact & enquiry form
/admin                                  Payload CMS (private, noindex)
```

## Running it locally

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run seed                   # writes the default content into the CMS
npm run dev                    # http://localhost:3000
```

To create the first admin login while seeding:

```bash
SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD='a-strong-password' npm run seed
```

The seed script is safe to re-run: products are matched by slug and updated
rather than duplicated.

Useful scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run migrate` | Bring the database schema up to date |
| `npm run typecheck` | TypeScript, no emit |
| `npm run seed` | Seed CMS content (and optionally the first admin user) |
| `npm run generate:types` | Regenerate `src/types/payload-types.ts` after CMS changes |

## Environment variables

All secrets live in environment variables — nothing is hardcoded. `.env.local`
is gitignored; `.env.example` lists the keys with no values.

| Key | Needed for |
|---|---|
| `DATABASE_URI` | Neon pooled connection string |
| `PAYLOAD_SECRET` | Signing admin sessions (32+ random characters) |
| `NEXT_PUBLIC_SERVER_URL` | Canonical URLs, sitemap, OG tags — `https://shrilakhdatarindustries.in` |
| `BLOB_READ_WRITE_TOKEN` | Uploading images to Vercel Blob |
| `RESEND_API_KEY` | Sending the enquiry notification |
| `ENQUIRY_TO_EMAIL` | Where enquiries are emailed — one address, or several separated by commas |
| `ENQUIRY_FROM_EMAIL` | Verified sender address on Resend |
| `NEXT_PUBLIC_WHATSAPP_PRIMARY` / `_SECONDARY` | WhatsApp links (public by design) |

`src/config/env.ts` validates them at startup, so a missing key fails loudly
instead of silently breaking a page. The site is deliberately tolerant of
partial configuration: without Resend an enquiry is still saved to the
database, and without a database the public pages fall back to the built-in
default content.

## Deploying to Vercel

1. **Neon** — create a project, copy the *pooled* connection string into
   `DATABASE_URI`.
2. **Vercel Blob** — create a store in the Vercel project, copy
   `BLOB_READ_WRITE_TOKEN`.
3. **Resend** — verify the sending domain, create an API key, set
   `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` and `ENQUIRY_TO_EMAIL`.
4. **Vercel project** — import this repository, add every variable above
   (`NEXT_PUBLIC_SERVER_URL` is `https://shrilakhdatarindustries.in`, no
   trailing slash), deploy.
5. **First admin user** — open `/admin` on the deployed site. With no users in
   the database yet, Payload asks you to create the first one right there.
6. **Domain** — point `shrilakhdatarindustries.in` at Vercel, and add
   `www.shrilakhdatarindustries.in` as a redirect to it so only one address is
   indexed.

### The database schema

`src/migrations` holds the schema. Vercel runs `vercel-build`
(`payload migrate && next build`) in place of `build`, so every deploy brings
the database up to date before the site is built — nothing to run by hand, and
a redeploy skips migrations that have already run.

If a deploy ever fails with *relation … does not exist*, Vercel did not pick up
that script: set the Build Command in the project settings to
`npm run vercel-build`.

In development the schema is pushed automatically instead. After changing a
collection or global, generate a migration with `npm run migrate:create <name>`
and commit it.

**Seeding is optional.** The site renders from its built-in defaults and the
enquiry form works as soon as the schema exists. Run `npm run seed` when you
want the CMS pre-filled with that same content so it can be edited from
`/admin` rather than starting from empty fields.

## Editing content

Everything on the public site is editable from `/admin` — no code changes
needed:

- **Pages** — Home, About, Process and Contact page content
- **Products** — title, description, colours, specifications, applications,
  buyer types, packing and supply, images, SEO
- **Site Settings** — company name, logo, phone numbers, WhatsApp numbers,
  email, address, map embed, supply areas, default SEO
- **Working Hours** — drives both the hours table and the live Open/Closed
  badge (Asia/Kolkata)
- **Enquiries** — every form submission, with a status you can move from New
  through to Closed

Saving in the CMS revalidates the affected pages, so changes appear on the site
straight away.

## How the pieces fit together

**Reading content.** Public pages are server components that call Payload's
Local API directly — no HTTP hop between the page and the database. An
`afterChange` hook revalidates the affected paths whenever content is saved.

**Enquiries.** The form validates in the browser with Zod, posts to
`/api/enquiry`, and the server validates again, checks the honeypot and the
per-IP rate limit, saves the lead to the database, sends the Resend
notification and returns a pre-filled WhatsApp link. The lead is saved first so
an email problem can never lose it.

**Security.** Secrets stay server-side (only the public WhatsApp numbers use
`NEXT_PUBLIC_`). `/admin` sits behind Payload auth and is `noindex`. The
`enquiries` collection cannot be read or created through the public API — only
the server route writes to it, and only signed-in admins can read it. Sender
addresses are stored hashed, for spam control only.

## Notes on content

Written to what the client confirmed. There are no certifications, capacity
figures, prices, statistics or testimonials on the site, because none have been
supplied. Product specification tables stay hidden until real values are
entered — the page says specifications are shared with the quote instead of
showing an empty table. Photographs are not used yet; product cards fall back
to colour swatches until real ones arrive.
