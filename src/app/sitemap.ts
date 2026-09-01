import type { MetadataRoute } from 'next'

import { serverUrl } from '@/config/env'
import { getProducts } from '@/server/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${serverUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${serverUrl}/about`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${serverUrl}/products`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${serverUrl}/process`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${serverUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
  ]

  return [
    ...staticRoutes,
    ...products.map((product) => ({
      url: `${serverUrl}/products/${product.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
