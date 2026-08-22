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
