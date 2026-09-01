# Saini Phool Bhandar — Website

Flower shop + event decoration website for **Saini Phool Bhandar**, Near Gur
Mandi, Sonipat, Haryana. Built with Next.js 14 (App Router) + TypeScript +
Tailwind CSS + Framer Motion, per `docs/PLANNING_SOURCE.md`
(PRD, Brand Guidelines, Brand Details, User Personas, Website Architecture,
Execution Plan).

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, trust strip, offers, decoration + gallery previews, why-us, CTA |
| `/flowers` | All flowers/bouquets/garlands with rates, category filter, per-item WhatsApp CTA |
| `/decoration` | Car / Haldi / Room decoration packages with starting rates |
| `/gallery` | Category-filterable photo grid with a keyboard-accessible lightbox |
| `/about` | Three-generation story timeline (Harivansh → Sunil → Ayush & Anant), values, Visit Us |
| `/contact` | Contact info, map, enquiry form (saved server-side + optional owner email) |

## Content layer — an important implementation note

`WEBSITE_ARCHITECTURE.md` specifies a full **Payload CMS 3 + Neon Postgres +
Vercel Blob + Resend** stack. This environment had no database, blob storage,
or email provider credentials available to provision and verify that stack
end-to-end, so the build uses a **local content layer** instead
(`src/lib/data/*.ts`) that mirrors the Payload collection/global field shapes
**exactly** — same field names, same types. Every component reads content
through these functions, never hardcoded inline, so migrating to real Payload
later is a matter of rewriting the *inside* of these functions (e.g.
`payload.find({ collection: 'flowers' })`) — no component or page changes
needed:

- `getSiteSettings()` → Payload `siteSettings` global
- `getFlowers()` → Payload `flowers` collection
- `getDecorationServices()` → Payload `decorationServices` collection
- `getGalleryItems()` → Payload `galleryItems` collection
- `getAboutStory()` → Payload `aboutStory` global
- `saveEnquiry()` (`src/lib/data/enquiries.ts`) → Payload `enquiries` collection (Neon-backed)

The **enquiry form is fully functional today**: `POST /api/enquiry` validates
input, persists it (JSON file under the OS temp dir — deliberately not the
project directory, since that's read-only on serverless platforms like
Vercel; swap for the real Neon-backed collection later), and attempts an
owner-notification email via Resend (`src/lib/resend.ts`) if
`RESEND_API_KEY` + `OWNER_NOTIFICATION_EMAIL` are set in `.env`; without them
it just logs and skips, exactly as `WEBSITE_ARCHITECTURE.md` intends ("an
email failure never blocks the
enquiry from being saved").

**Images**: real shop/decoration photography must come from the owner via
`/admin` per `BRAND_GUIDELINES.md` ("no stock photography"). Until that CMS
exists, `src/lib/images.ts` holds curated placeholder photography so every
page can be reviewed with realistic imagery instead of grey boxes.
`components/ui/ImageWithFallback.tsx` gracefully degrades any image that
fails to load to a soft branded placeholder — never a broken-image icon.
The About page's three generation photos are intentionally left photo-less
(monogram placeholder instead) rather than standing in unrelated stock
photos for named real people — those must be the family's own photos.

## Getting started

```bash
npm install
npm run dev
```

Optional, for the enquiry-form email notification — copy `.env.example` to
`.env` and fill in `RESEND_API_KEY` + `OWNER_NOTIFICATION_EMAIL`.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS — design tokens in `tailwind.config.ts` map 1:1 to `BRAND_GUIDELINES.md`
- Framer Motion — shared variants in `src/lib/animations.ts`, all motion
  respects `prefers-reduced-motion`
- `lucide-react` for line icons (per Brand Guidelines — no filled icons/emoji in UI chrome)
- `zod` for the enquiry API route's server-side validation
