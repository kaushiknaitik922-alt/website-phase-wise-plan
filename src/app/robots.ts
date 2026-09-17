import type { MetadataRoute } from 'next'

import { serverUrl } from '@/config/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The CMS and the enquiry endpoint have no business in search results,
        // and /label-demo is an unrelated design concept, not part of this site.
        disallow: ['/admin', '/api/', '/label-demo'],
      },
    ],
    sitemap: `${serverUrl}/sitemap.xml`,
  }
}
