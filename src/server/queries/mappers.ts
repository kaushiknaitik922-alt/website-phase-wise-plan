import type { CtaBand, Hero, IconCard, ImageView, SeoView } from '@/types/content'

/** Empty strings, empty arrays and nulls from an unfilled CMS field all mean "use the default". */
export const orDefault = <T>(value: T | null | undefined, fallback: T): T => {
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string' && value.trim() === '') return fallback
  if (Array.isArray(value) && value.length === 0) return fallback
  return value
}

type MediaDoc = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>
}

export const toImage = (value: unknown, size?: 'thumbnail' | 'card' | 'hero'): ImageView => {
  if (!value || typeof value !== 'object') return null
  const doc = value as MediaDoc
  const sized = size ? doc.sizes?.[size] : undefined
  const url = sized?.url ?? doc.url
  if (!url) return null
  return {
    url,
    alt: doc.alt ?? '',
    width: sized?.width ?? doc.width ?? null,
    height: sized?.height ?? doc.height ?? null,
  }
}

export const toSeo = (value: unknown): SeoView | undefined => {
  if (!value || typeof value !== 'object') return undefined
  const seo = value as { metaTitle?: string | null; metaDescription?: string | null; ogImage?: unknown }
  return {
    metaTitle: seo.metaTitle ?? null,
    metaDescription: seo.metaDescription ?? null,
    ogImage: toImage(seo.ogImage),
  }
}

export const toHero = (value: unknown, fallback: Hero): Hero => {
  if (!value || typeof value !== 'object') return fallback
  const hero = value as Record<string, unknown>
  if (!hero.heading) return fallback
  return {
    kicker: orDefault(hero.kicker as string, fallback.kicker ?? ''),
    heading: hero.heading as string,
    subheading: orDefault(hero.subheading as string, fallback.subheading ?? ''),
    image: toImage(hero.image, 'hero') ?? fallback.image ?? null,
    primaryCtaLabel: orDefault(hero.primaryCtaLabel as string, fallback.primaryCtaLabel ?? ''),
    primaryCtaHref: orDefault(hero.primaryCtaHref as string, fallback.primaryCtaHref ?? ''),
    secondaryCtaLabel: orDefault(hero.secondaryCtaLabel as string, fallback.secondaryCtaLabel ?? ''),
    secondaryCtaHref: orDefault(hero.secondaryCtaHref as string, fallback.secondaryCtaHref ?? ''),
  }
}

export const toCtaBand = (value: unknown, fallback: CtaBand): CtaBand => {
  if (!value || typeof value !== 'object') return fallback
  const band = value as Record<string, unknown>
  if (!band.heading) return fallback
  return {
    heading: band.heading as string,
    text: orDefault(band.text as string, fallback.text ?? ''),
    buttonLabel: orDefault(band.buttonLabel as string, fallback.buttonLabel),
    buttonHref: orDefault(band.buttonHref as string, fallback.buttonHref),
    showPhoneNumbers: band.showPhoneNumbers !== false,
  }
}

export const toIconCards = (value: unknown, fallback: IconCard[]): IconCard[] => {
  if (!Array.isArray(value) || value.length === 0) return fallback
  return value
    .filter((card): card is Record<string, unknown> => Boolean(card) && typeof card === 'object')
    .map((card) => ({
      icon: (card.icon as IconCard['icon']) ?? 'factory',
      heading: (card.heading as string) ?? '',
      text: (card.text as string) ?? '',
    }))
    .filter((card) => card.heading.length > 0)
}

/** Turns an array of single-key rows (Payload's shape for simple lists) into strings. */
export const toStringList = (value: unknown, key: string, fallback: string[]): string[] => {
  if (!Array.isArray(value) || value.length === 0) return fallback
  const list = value
    .map((row) => (row && typeof row === 'object' ? ((row as Record<string, unknown>)[key] as string) : undefined))
    .filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
  return list.length > 0 ? list : fallback
}
