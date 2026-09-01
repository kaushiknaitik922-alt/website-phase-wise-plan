import type { Metadata } from 'next'

import { serverUrl } from '@/config/env'
import type { SeoView, SiteSettingsView } from '@/types/content'

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

/**
 * Structured data. Only facts we can stand behind go in here — no ratings, no
 * price ranges, no invented identifiers.
 */
export const organizationJsonLd = (settings: SiteSettingsView) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: settings.companyName,
  ...(settings.legalName ? { legalName: settings.legalName } : {}),
  url: serverUrl,
  description: settings.footerAbout,
  ...(settings.logo?.url ? { logo: `${serverUrl}${settings.logo.url}` } : {}),
  telephone: [settings.phonePrimary, settings.phoneSecondary].filter(Boolean),
  ...(settings.email ? { email: settings.email } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: settings.addressLines.join(', '),
    addressLocality: 'New Delhi',
    addressCountry: 'IN',
  },
  areaServed: settings.supplyAreas,
  ...(settings.establishedYear ? { foundingDate: String(settings.establishedYear) } : {}),
})

export const productJsonLd = ({
  title,
  description,
  slug,
  image,
  settings,
}: {
  title: string
  description: string
  slug: string
  image?: string | null
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
