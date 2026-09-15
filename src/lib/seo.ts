import type { Metadata } from 'next'

import { serverUrl } from '@/config/env'
import type { FaqItem, SeoView, SiteSettingsView, WorkingHoursView } from '@/types/content'

type PageMetaInput = {
  title: string
  description: string
  path: string
  seo?: SeoView
  settings: SiteSettingsView
}

/**
 * Page metadata: CMS overrides win, otherwise the page's own heading and
 * description are used.
 */
export const buildMetadata = ({
  title,
  description,
  path,
  seo,
  settings,
}: PageMetaInput): Metadata => {
  const metaTitle = seo?.metaTitle?.trim() || title
  const metaDescription = seo?.metaDescription?.trim() || description
  const image = seo?.ogImage?.url ?? settings.defaultSeo.ogImage?.url
  const url = `${serverUrl}${path}`

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${metaTitle} · ${settings.companyName}`,
      description: metaDescription,
      url,
      siteName: settings.companyName,
      locale: 'en_IN',
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: `${metaTitle} · ${settings.companyName}`,
      description: metaDescription,
    },
  }
}

/** The pin on the client's Google Business Profile, read off their embed URL. */
const FACTORY_GEO = { lat: 28.800858, lng: 77.071562 }

const DAY_NAMES: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

const openingHours = (hours: WorkingHoursView) =>
  hours.days
    .filter((day) => !day.isClosed && day.openTime && day.closeTime && DAY_NAMES[day.day])
    .map((day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${DAY_NAMES[day.day]}`,
      opens: day.openTime,
      closes: day.closeTime,
    }))

/**
 * Structured data. Only facts we can stand behind go in here — no ratings, no
 * price ranges, no invented identifiers.
 */
/**
 * The factory itself: a LocalBusiness so Google can place it on the map and in
 * "near me" results, not just an Organization. Coordinates come from the
 * client's own Google Business Profile pin.
 */
export const localBusinessJsonLd = (settings: SiteSettingsView, hours?: WorkingHoursView) => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${serverUrl}/#business`,
  name: settings.companyName,
  ...(settings.legalName ? { legalName: settings.legalName } : {}),
  url: serverUrl,
  description: settings.footerAbout,
  ...(settings.logo?.url ? { logo: `${serverUrl}${settings.logo.url}`, image: `${serverUrl}${settings.logo.url}` } : {}),
  telephone: [settings.phonePrimary, settings.phoneSecondary].filter(Boolean),
  ...(settings.email ? { email: settings.email } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: settings.addressLines[0] ?? '',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: FACTORY_GEO.lat, longitude: FACTORY_GEO.lng },
  areaServed: settings.supplyAreas,
  ...(settings.establishedYear ? { foundingDate: String(settings.establishedYear) } : {}),
  ...(hours ? { openingHoursSpecification: openingHours(hours) } : {}),
})

export const productJsonLd = ({
  title,
  description,
  slug,
  image,
  specifications,
  settings,
}: {
  title: string
  description: string
  slug: string
  image?: string | null
  specifications?: { label: string; value: string }[]
  settings: SiteSettingsView
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: title,
  description,
  url: `${serverUrl}/products/${slug}`,
  ...(image ? { image } : {}),
  brand: { '@type': 'Brand', name: settings.companyName },
  manufacturer: { '@type': 'Organization', name: settings.companyName },
  ...(specifications?.length
    ? {
        additionalProperty: specifications.map((spec) => ({
          '@type': 'PropertyValue',
          name: spec.label,
          value: spec.value,
        })),
      }
    : {}),
})

export const faqJsonLd = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${serverUrl}${item.path}`,
  })),
})
