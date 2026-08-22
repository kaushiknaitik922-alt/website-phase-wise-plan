/**
 * View models used by the pages.
 *
 * The CMS is the source of truth, but every page can also render from the
 * defaults in `src/config/content.ts` — that is what keeps the site working
 * before the CMS has been filled in, and what the seed script writes into it.
 *
 * Rich text is either a Lexical document from Payload or a plain string in the
 * defaults; `<RichText />` renders both.
 */
export type RichTextValue = string | { root: unknown } | null | undefined

export type ImageView = {
  url: string
  alt: string
  width?: number | null
  height?: number | null
} | null

export type IconName = 'factory' | 'recycle' | 'truck' | 'shield' | 'layers' | 'clock'

export type IconCard = {
  icon: IconName
  heading: string
  text: string
}

export type CtaBand = {
  heading: string
  text?: string
  buttonLabel: string
  buttonHref: string
  showPhoneNumbers: boolean
}

export type Hero = {
  kicker?: string
  heading: string
  subheading?: string
  image?: ImageView
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export type SiteSettingsView = {
  companyName: string
  tagline: string
  logo: ImageView
  experienceYears: number
  establishedYear?: number | null
  legalName?: string | null
  gstNumber?: string | null
  footerAbout: string
  phonePrimary: string
  phoneSecondary?: string | null
  whatsappPrimary?: string | null
  whatsappSecondary?: string | null
  email?: string | null
  addressLines: string[]
  googleMapsEmbedUrl?: string | null
  supplyAreas: string[]
  defaultSeo: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: ImageView
  }
}

export type WorkingDay = {
  day: string
  label: string
  isClosed: boolean
  openTime: string
  closeTime: string
}

export type WorkingHoursView = {
  days: WorkingDay[]
  note?: string | null
}

export type HomePageView = {
  hero: Hero
  featureCards: IconCard[]
  aboutSnippet: {
    kicker: string
    heading: string
    body: string
    image?: ImageView
    linkLabel: string
  }
  productsSection: { kicker: string; heading: string; intro?: string }
  whyChooseUs: { kicker: string; heading: string; points: IconCard[] }
  processStrip: {
    kicker: string
    heading: string
    steps: { title: string; text?: string }[]
    linkLabel: string
  }
  supplyArea: { heading: string; text: string }
  ctaBand: CtaBand
}

export type AboutPageView = {
  hero: Hero
  sections: {
    heading: string
    body: RichTextValue
    image?: ImageView
    imagePosition: 'left' | 'right'
  }[]
  ctaBand: CtaBand
  seo?: SeoView
}

export type ProcessPageView = {
  hero: Hero
  intro?: string
  steps: { title: string; description: string; image?: ImageView }[]
  dependability: { heading: string; body: RichTextValue }
  ctaBand: CtaBand
  seo?: SeoView
}

export type ContactPageView = {
  hero: Hero
  intro?: string
  formHeading: string
  formIntro?: string
  directionsNote?: string
  thankYouMessage: string
  seo?: SeoView
}

export type SeoView = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: ImageView
}

export type ProductView = {
  id: string | number
  title: string
  slug: string
  category: string
  shortDescription: string
  heroImage?: ImageView
  gallery: ImageView[]
  overview: RichTextValue
  packingSupply: RichTextValue
  colours: { name: string; hexCode: string }[]
  specifications: { label: string; value: string }[]
  applications: { application: string; note?: string }[]
  buyerTypes: string[]
  displayOrder: number
  isFeatured: boolean
  seo?: SeoView
}
