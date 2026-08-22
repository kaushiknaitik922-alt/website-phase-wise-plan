# Shri Lakhdatar Industries — Website Plan & Technical Architecture

**Status:** Planning only. Koi code abhi nahi likha gaya. Approval ke baad phase-by-phase build shuru hoga.
**Date:** 21 August 2026

---

## 1. Business Understanding (jo maine samjha)

**Company:** Shri Lakhdatar Industries — B2B plastic manufacturing & recycling
**Factory:** Sector 5, Bawana, New Delhi
**Experience:** 15+ years
**Contacts:** 8587060393, 8383044264 (dono hamesha active, dono WhatsApp par)
**Market:** Purely B2B — koi retail/consumer selling nahi
**Supply area:** Delhi, Haryana, Rajasthan, parts of UP, other parts of North India

### Teen alag product categories (kabhi mix nahi karne hain)

| # | Product | Kya hai | Kaun kharidta hai |
|---|---------|---------|-------------------|
| 1 | **Recycled PP Granules** (core focus) | Factories se aaya PP waste — trimmings, rejected parts, leftover pieces — process hokar granules banta hai. Colours: Natural, Blue, Black, Green, Light Grey, Dark Grey, Red | Plastic product manufacturers jo isse raw material ki tarah use karte hain — plastic files, jute lamination, aur bahut se doosre finished goods |
| 2 | **HDPE Sheets** | Colours: Blue, Black, White, Green. Main use: commercial vehicle fender lining (rust se bachata hai). Long-term permanent installations — house gates etc., approx 2.5–3.5 saal | Commercial vehicle / car accessory businesses, fabricators, long-term installation ke liye |
| 3 | **RO Filter Housing Bottles** | Commercial filter housing — isme RO filter dalta hai, paani filter hokar RO mein store hota hai. Standard: blue bottle + black cap | Schools, industrial factories, badi companies, commercial RO/filter businesses — sab B2B |

### Content rules (in sab par website likhi jayegi)

- "Reasonable / competitive pricing" — **kabhi nahi**: "cheapest", "lowest price guaranteed", "best in India"
- Koi fake certification (ISO/MSME/BIS), fake statistics, fake testimonials, fake prices nahi
- "100% eco-friendly" jaisa exaggerated claim nahi
- Recycled plastic ko kabhi low-quality material ki tarah present nahi karna
- Simple, professional, trustworthy English — jargon minimal, clickbait zero
- Missing technical info **poochni** hai, assume nahi karni

---

## 2. Reference Image Analysis (PETRO theme)

Reference se ye elements lene layak hain — **layout language, design copy nahi**:

| Element | Reference mein | Humare site par kaise |
|---|---|---|
| Top utility bar | Patli dark strip, tagline left, links right | Navy strip — tagline + "Mon–Fri, Sun · 9 AM–9 PM" + dono numbers |
| Contact info strip | Email / Call / Location icons + CTA button | Same 3-block strip, CTA = **"Get a Quote"** (green, red nahi) |
| Main nav | Solid navy bar, dropdown menus | Navy bar, Products ka simple dropdown (3 items), search hata denge |
| Hero | Image slider, heading + 2 buttons | **Static banner** (slider baad mein jab real photos aayengi) |
| 3 feature cards | Icon + heading + text, hero ke neeche overlap | 3 cards: 15+ Years Experience · In-House Recycling · B2B Bulk Supply |
| Section heading | Small kicker + bada heading + accent underline | Same pattern, accent line green (#4A8B2C) |
| Services grid | Image card + coloured title + text | **Products grid** — 3 cards, colour swatches ke saath |
| Dark CTA band | Full-width dark band + text + button | Full-width navy band — "Need bulk supply? Call us." |
| Team/person block | Photo + designation + paragraph | Skip (koi real photo nahi) — iski jagah "Our Process" strip |

**Colours (aapke logo se, reference se nahi):** Navy `#1C3557` primary · Green `#4A8B2C` accent/CTA · White + light grey backgrounds. Reference ka red **use nahi hoga**.
**Typography:** ek clean industrial sans (Inter / Barlow family) — headings tight & uppercase-ish, body normal.
**Feel:** Modern · Premium · Professional · Industrial · Clean · Trustworthy · B2B.
**Animations:** sirf subtle hover + fade-in-on-scroll. Koi heavy effect nahi.

---

## 3. Missing Information — mujhe ye chahiye

Ye sab **CMS se baad mein bhi bhara ja sakta hai**, isliye build ruknI nahi chahiye — lekin jitna abhi mil jaye, utna better first version banega.

### Product specs (sabse zaroori)
1. **PP Granules** — koi grade/quality naming hai? Packing kaise hoti hai (25 kg / 50 kg bag)? Minimum order quantity kya hai?
2. **HDPE Sheets** — available thickness range (mm)? Standard sheet size (ft × ft ya mm × mm)? Minimum order?
3. **RO Filter Housing Bottles** — sizes (10 inch / 20 inch, slim / jumbo)? Thread/port size (1/4", 1/2")? Minimum order?

### Company details
4. Business exactly kis saal shuru hua? ("15+ years" ke saath "Since 20XX" likhna ho toh)
5. Firm ka legal/registered naam aur GST number website par dikhana hai ya nahi?
6. Factory ka **poora address with pincode** + Google Maps par exact location/pin
7. Enquiry emails kis email address par aani chahiye? Aur koi official business email hai (jaise info@...) ya Gmail chalega?

### Assets & domain
8. Logo file — SVG ya high-res PNG mil sakti hai?
9. Domain naam khareeda hai? (jaise shrilakhdatarindustries.com) Agar nahi, toh main options suggest kar dunga.
10. Real factory/product photos ka kya plan hai — kitne din mein mil sakti hain? (Tab tak clean placeholders + colour swatches use honge)

### Operational
11. Delivery/transport aap arrange karte ho ya buyer? Sample bhejte ho ya nahi?
12. Kya koi capacity number share karna chahoge (jaise "X tonnes per month")? — sirf agar sach mein pata ho, warna skip.

---

## 4. Proposed Sitemap (8 pages)

```
/                          Home
/about                     About Us
/products                  Products (hub — 3 categories)
/products/pp-granules      Recycled PP Granules
/products/hdpe-sheets      HDPE Sheets
/products/ro-filter-housing-bottles   RO Filter Housing Bottles
/process                   Our Process (recycling → granules → products)
/contact                   Contact & Enquiry
/admin                     Payload CMS (aapka private dashboard)
```

### Page-by-page sections

**Home**
1. Top utility bar + contact strip + navy nav
2. Hero banner — heading, sub-line, "Get a Quote" + "View Products"
3. 3 feature cards (overlapping hero bottom)
4. About snippet — heading + 2 paragraphs + "Read More"
5. Products grid — 3 cards with colour swatches
6. Why Choose Us — 4 points (15+ years · in-house recycling · consistent supply · reasonable pricing)
7. Process strip — 4 steps, horizontal
8. Supply area line — Delhi, Haryana, Rajasthan, parts of UP & North India
9. Dark CTA band — "Bulk requirement? Call us" + dono numbers
10. Footer — logo, quick links, products, contact, hours summary

**About** — company intro · what we do · 15+ years journey · products overview · supply area · why B2B buyers work with us · CTA

**Products (hub)** — intro line + 3 big category cards (image/swatch, short desc, "View Details") + CTA band

**Each product page** — hero strip with product name · overview · available colours (visual swatches) · specifications table · applications list · "Who buys this" · packing & supply info · enquiry form (product pre-selected) · related products

**Process** — 4–6 step visual flow: waste collection → sorting → grinding/washing → extrusion/granulation → quality check → dispatch. Plus "why recycled material is dependable" (bina overclaim ke).

**Contact** — **Open Now / Closed Now** live badge · working hours **table** (day | timing | status) · dono phone numbers (click-to-call + WhatsApp) · address · Google Map embed · enquiry form · directions note

---

## 5. Technical Architecture

**Stack (aapke Sir ka diya hua — koi change nahi):**

| Layer | Tech |
|---|---|
| Framework | **Next.js 15 (App Router) + React 19** |
| Server-side | **Node.js** — Next.js Route Handlers + Server Actions (same runtime) |
| CMS | **Payload CMS 3** (Next.js app ke andar native) |
| Database | **Neon PostgreSQL** (`@payloadcms/db-postgres` + Drizzle) |
| Email | **Resend** (enquiry notification) |
| Media | **Vercel Blob** (`@payloadcms/storage-vercel-blob`) |
| Styling | Tailwind CSS + CSS variables for brand tokens |
| Validation | Zod (form + API input) |
| Deploy | **Vercel** + GitHub auto-deploy |

**Aapke chaar answers jo lock ho gaye:**
- Hosting: **Vercel** → isliye media Vercel Blob par (Vercel ka filesystem ephemeral hai, local disk par images nahi tik sakti)
- Payload: **same Next.js app ke andar** — ek repo, ek deploy, ek DB connection
- Enquiry: **Neon DB mein save + Resend se email + WhatsApp option**
- CMS scope: **poora content editable**

### Rendering strategy
- Saare public pages **Server Components** — Payload ka Local API seedhe call hoga (koi HTTP hop nahi, isliye fast)
- ISR/revalidation: CMS mein content save hote hi Payload hook `revalidatePath()` maarega → page turant update
- Sirf enquiry form aur Open/Closed badge Client Components honge
- **Koi bhi secret client par nahi jayega** — sab server-side

---

## 6. Proposed Folder Structure

```
shri-lakhdatar-industries/
├── src/
│   ├── app/
│   │   ├── (frontend)/                    # public website
│   │   │   ├── layout.tsx                 # header + footer shell
│   │   │   ├── page.tsx                   # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx               # hub
│   │   │   │   └── [slug]/page.tsx        # dynamic product page
│   │   │   ├── process/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── sitemap.ts
│   │   │   └── robots.ts
│   │   ├── (payload)/                     # Payload admin (auto-generated)
│   │   │   ├── admin/[[...segments]]/
│   │   │   └── api/[...slug]/
│   │   └── api/
│   │       └── enquiry/route.ts           # custom enquiry endpoint
│   │
│   ├── components/
│   │   ├── layout/                        # TopBar, ContactStrip, Navbar, Footer, MobileMenu
│   │   ├── sections/                      # Hero, FeatureCards, AboutSnippet, ProductGrid,
│   │   │                                  # WhyChooseUs, ProcessStrip, CtaBand
│   │   ├── product/                       # ProductCard, ColourSwatches, SpecTable, ApplicationList
│   │   ├── contact/                       # EnquiryForm, WorkingHoursTable, OpenStatusBadge, MapEmbed
│   │   └── ui/                            # Button, Container, SectionHeading, Input, Select, Textarea
│   │
│   ├── collections/                       # Payload collections
│   │   ├── Users.ts
│   │   ├── Media.ts
│   │   ├── Products.ts
│   │   └── Enquiries.ts
│   ├── globals/                           # Payload globals
│   │   ├── SiteSettings.ts
│   │   ├── WorkingHours.ts
│   │   ├── HomePage.ts
│   │   ├── AboutPage.ts
│   │   ├── ProcessPage.ts
│   │   └── ContactPage.ts
│   ├── fields/                            # reusable field groups (seo, slug, colourSwatch)
│   ├── hooks/                             # revalidate hooks, enquiry afterChange
│   │
│   ├── server/
│   │   ├── payload.ts                     # getPayload() singleton
│   │   ├── queries/                       # getProducts, getProductBySlug, getSiteSettings...
│   │   ├── actions/                       # submitEnquiry (server action)
│   │   └── email/                         # resend client + enquiry template
│   │
│   ├── lib/
│   │   ├── validation/enquiry.ts          # Zod schema (shared client+server)
│   │   ├── whatsapp.ts                    # pre-filled WhatsApp link builder
│   │   ├── working-hours.ts               # open/closed calculation (Asia/Kolkata)
│   │   ├── seo.ts                         # metadata + JSON-LD helpers
│   │   └── utils.ts
│   │
│   ├── config/
│   │   ├── site.ts                        # fallback constants, nav structure
│   │   └── env.ts                         # Zod-validated env loader
│   │
│   ├── styles/globals.css                 # Tailwind + brand CSS variables
│   ├── types/                             # shared TS types
│   └── payload.config.ts
│
├── public/                                # logo, favicon, static placeholders
├── .env.example                           # sirf keys, koi value nahi
├── .env.local                             # gitignored — asli secrets yahan
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Rule:** ek bhi page apne andar business logic nahi rakhega. Page = layout + sections. Data `server/queries/` se. Logic `lib/` mein. Ye hi "modular aur scalable" ka matlab hai.

---

## 7. Payload CMS — Proposed Collections & Globals

### Collections

**1. `users`** — admin login (Payload built-in auth)
`email`, `password` (hashed), `name`, `role` (admin | editor)

**2. `media`** — saari images
`filename`, `alt` (required — SEO/accessibility), `caption`, auto sizes: thumbnail 400 / card 768 / hero 1600, Vercel Blob par store

**3. `products`** — teen categories, extend ho sakta hai
| Field | Type | Note |
|---|---|---|
| `title` | text | "Recycled PP Granules" |
| `slug` | text (unique, auto) | URL |
| `category` | select | pp-granules / hdpe-sheets / ro-filter-housing |
| `shortDescription` | textarea | cards ke liye |
| `heroImage` | upload → media | |
| `gallery` | array → media | |
| `overview` | richText | product page ka main content |
| `colours` | array | `name` + `hexCode` → visual swatches |
| `specifications` | array | `label` + `value` → spec table |
| `applications` | array | `application` + optional `note` |
| `buyerTypes` | array | "Kaun kharidta hai" |
| `packingSupply` | richText | packing, MOQ, dispatch |
| `displayOrder` | number | grid ordering |
| `isFeatured` | checkbox | home page grid |
| `seo` | group | `metaTitle`, `metaDescription`, `ogImage` |

**4. `enquiries`** — form submissions (admin read-only, create sirf API se)
`name`, `companyName`, `phone`, `email`, `productInterest` (relation → products), `quantity`, `message`, `status` (new / contacted / quoted / closed), `source` (contact-page / product-page), `submittedAt`, `ipHash`

### Globals (single-instance content)

**5. `site-settings`** — `companyName`, `tagline`, `logo`, `phonePrimary`, `phoneSecondary`, `whatsappPrimary`, `whatsappSecondary`, `email`, `addressLines`, `googleMapsEmbedUrl`, `experienceYears`, `supplyAreas` (array), `footerAbout`, `defaultSeo`

**6. `working-hours`** — 7 rows: `day`, `isClosed`, `openTime`, `closeTime` → hours table + live Open/Closed badge dono isi se chalenge

**7. `home-page`** — `hero` (heading, subheading, image, 2 CTAs), `featureCards` (array), `aboutSnippet`, `whyChooseUs` (array), `processStrip` (array), `ctaBand`

**8. `about-page`** — `hero`, `sections` (array: heading + richText + optional image), `ctaBand`

**9. `process-page`** — `hero`, `steps` (array: stepNumber, title, description, icon/image), `note`

**10. `contact-page`** — `hero`, `intro`, `formHeading`, `directionsNote`, `thankYouMessage`

**Matlab:** product ka naam, colour, spec, home ka heading, phone number, working hours — sab kuch aap `/admin` se khud badal sakte ho. Code kabhi haath nahi lagana padega.

---

## 8. Neon PostgreSQL — Database Structure

Payload apne aap Drizzle migrations se ye tables banata hai. Manual SQL likhne ki zaroorat nahi, lekin structure ye rahega:

| Table | Kya store karta hai |
|---|---|
| `users` | admin accounts (password hashed — plain kabhi nahi) |
| `media` | image metadata + Blob URLs + generated sizes |
| `products` | main product rows |
| `products_colours` | colour swatches (array → child table, FK `_parent_id`) |
| `products_specifications` | spec rows |
| `products_applications` | applications |
| `products_buyer_types` | buyer types |
| `products_rels` | relationships (product → media) |
| `enquiries` | saari form submissions |
| `site_settings` / `working_hours` / `home_page` / `about_page` / `process_page` / `contact_page` | globals (+ unke array child tables) |
| `payload_migrations` | schema version history |
| `payload_preferences`, `payload_locked_documents` | admin UI internals |

**Website ko kya store karna hai, short mein:**
1. **Content** — products, unke specs/colours/applications, page sections, company info, working hours → CMS se editable
2. **Media** — image metadata DB mein, actual file Vercel Blob par
3. **Leads** — enquiry submissions (aapka asli business data)
4. **Auth** — admin users

**Indexes:** `products.slug` (unique), `products.category`, `enquiries.submitted_at DESC`, `enquiries.status`
**Connection:** Neon serverless pooled connection string, `DATABASE_URI` env var se. **Hardcode kuch nahi.**

### Environment variables (sab `.env.local` mein, git mein kabhi nahi)

```
DATABASE_URI=              # Neon pooled connection string
PAYLOAD_SECRET=            # random 32+ char string
NEXT_PUBLIC_SERVER_URL=    # https://<domain>
BLOB_READ_WRITE_TOKEN=     # Vercel Blob
RESEND_API_KEY=            # Resend
ENQUIRY_TO_EMAIL=          # jahan enquiry aani hai
ENQUIRY_FROM_EMAIL=        # verified sender domain
NEXT_PUBLIC_WHATSAPP_PRIMARY=8587060393
NEXT_PUBLIC_WHATSAPP_SECONDARY=8383044264
```
`.env.example` repo mein jayegi — **sirf key names, koi value nahi**. `env.ts` startup par Zod se validate karega taaki missing key silently na toote.

---

## 9. Sab kaise connect hoga

### A. Content dikhne ka flow (read)
```
Aap /admin par edit karte ho
        ↓
Payload → Drizzle → Neon Postgres mein save
        ↓
afterChange hook → revalidatePath('/products') etc.
        ↓
Next.js Server Component getPayload().find() call karta hai (Local API — direct DB, no HTTP)
        ↓
React components pre-rendered HTML banate hain
        ↓
Browser mein page instantly load
```
Local API ka fayda: server apne hi API ko HTTP request nahi maarta — ek network hop bachta hai, page tez khulta hai.

### B. Enquiry ka flow (write)
```
User form bharta hai (Client Component, Zod se client-side validate)
        ↓
Server Action / POST /api/enquiry
        ↓
Server par dobara Zod validate + honeypot + rate limit (spam se bachao)
        ↓
1. Payload create → enquiries table (Neon)
2. Resend → aapke email par notification
3. Response mein pre-filled WhatsApp link
        ↓
User ko success message + "Continue on WhatsApp" button
```
Teeno cheezein isliye — email miss ho jaye toh bhi lead DB mein safe hai, aur WhatsApp se instant baat ho jaati hai.

### C. Open Now / Closed Now badge
`working-hours` global server se aata hai → client component `Asia/Kolkata` time se compare karta hai → live badge. Aap hours CMS se badal do, badge apne aap adjust ho jayega.

### D. Security
- Saare secrets env vars mein, sirf server par — `NEXT_PUBLIC_` wale sirf public numbers hain
- Admin panel Payload auth ke peeche, `/admin` noindex
- `enquiries` collection: public create allowed (rate-limited), read sirf logged-in admin
- Saara user input Zod se validate + sanitize
- Payload built-in SQL injection protection (Drizzle parameterized queries)

---

## 10. Build Phases (approval ke baad)

| Phase | Kya hoga | Deliverable |
|---|---|---|
| 1 | Next.js + Payload + Neon setup, admin login chalu | Working `/admin` |
| 2 | Saari collections + globals + seed data | CMS ready |
| 3 | Design system + header/footer/nav + responsive shell | Layout live |
| 4 | Home page (saare sections) | Home done |
| 5 | About + Process pages | 2 pages done |
| 6 | Products hub + 3 product detail pages | Products done |
| 7 | Contact + enquiry API + Resend + WhatsApp + hours table + badge | Enquiry live |
| 8 | SEO, JSON-LD, performance, 4-device responsive QA, deploy guide | Launch-ready |

Har phase ke baad main aapko dikhaunga, aap check karoge, tabhi next phase.

---

## 11. Constraints jo main follow kar raha hoon

- ✅ Koi extra feature nahi — sirf jo plan mein hai
- ✅ Koi credential hardcode nahi — sab env vars
- ✅ Mobile responsiveness par koi compromise nahi — mobile-first CSS, 4 devices par test
- ✅ Architecture change bina approval ke nahi
- ✅ Numbers 8587060393 / 8383044264 jaise ke waise
- ✅ Reference sirf inspiration — design original

---

## Approval chahiye

Please confirm:
1. **Sitemap** (8 pages) theek hai?
2. **Technical architecture** approve?
3. **Folder structure** approve?
4. **Payload collections & fields** approve?
5. **Database structure** approve?
6. Section 3 ke **questions** ke jitne answers abhi de sako — de do.

Aapke "go ahead" ke baad main **Phase 1** se shuru karunga.
