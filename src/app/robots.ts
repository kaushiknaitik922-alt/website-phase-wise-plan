import type { MetadataRoute } from 'next'

import { serverUrl } from '@/config/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The CMS and the enquiry endpoint have no business in search results.
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${serverUrl}/sitemap.xml`,
  }
}
