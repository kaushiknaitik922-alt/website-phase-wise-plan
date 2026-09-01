import { cache } from 'react'

import { defaultProducts } from '@/config/content'
import { fromCms } from '@/server/payload'
import { withLocalPhotos } from '@/server/product-photos'
import type { ProductView } from '@/types/content'

import { toImage, toSeo } from './mappers'

const toProduct = (doc: Record<string, unknown>): ProductView => {
  const list = <T>(value: unknown, map: (row: Record<string, unknown>) => T): T[] =>
    Array.isArray(value)
      ? value
          .filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === 'object')
          .map(map)
      : []

  return {
    id: (doc.id as string | number) ?? '',
    title: (doc.title as string) ?? '',
    slug: (doc.slug as string) ?? '',
    category: (doc.category as string) ?? '',
    shortDescription: (doc.shortDescription as string) ?? '',
    heroImage: toImage(doc.heroImage, 'card'),
    gallery: list(doc.gallery, (row) => toImage(row.image, 'card')).filter(Boolean),
    overview: doc.overview as ProductView['overview'],
    packingSupply: doc.packingSupply as ProductView['packingSupply'],
    colours: list(doc.colours, (row) => ({
      name: (row.name as string) ?? '',
      hexCode: (row.hexCode as string) ?? '#CCCCCC',
    })),
    specifications: list(doc.specifications, (row) => ({
      label: (row.label as string) ?? '',
      value: (row.value as string) ?? '',
    })),
    applications: list(doc.applications, (row) => ({
      application: (row.application as string) ?? '',
      note: (row.note as string) ?? undefined,
    })),
    buyerTypes: list(doc.buyerTypes, (row) => (row.buyerType as string) ?? '').filter(Boolean),
    displayOrder: (doc.displayOrder as number) ?? 0,
    isFeatured: doc.isFeatured !== false,
    seo: toSeo(doc.seo),
  }
}

const byOrder = (a: ProductView, b: ProductView) => a.displayOrder - b.displayOrder

export const getProducts = cache(
  async (): Promise<ProductView[]> =>
    fromCms(
      'products',
      async (payload) => {
        const result = await payload.find({
          collection: 'products',
          depth: 1,
          limit: 50,
          sort: 'displayOrder',
          overrideAccess: false,
        })

        if (result.docs.length === 0) return await withLocalPhotos(defaultProducts)
        return await withLocalPhotos(
          result.docs
            .map((doc) => toProduct(doc as unknown as Record<string, unknown>))
            .sort(byOrder),
        )
      },
      await withLocalPhotos(defaultProducts),
    ),
)

export const getFeaturedProducts = cache(async (): Promise<ProductView[]> => {
  const products = await getProducts()
  const featured = products.filter((product) => product.isFeatured)
  return featured.length > 0 ? featured : products
})

export const getProductBySlug = cache(async (slug: string): Promise<ProductView | null> => {
  const [fallback = null] = await withLocalPhotos(
    defaultProducts.filter((product) => product.slug === slug),
  )

  return fromCms(
    `product:${slug}`,
    async (payload) => {
      const result = await payload.find({
        collection: 'products',
        where: { slug: { equals: slug } },
        depth: 1,
        limit: 1,
        overrideAccess: false,
      })

      const doc = result.docs[0]
      if (!doc) return fallback
      const [product] = await withLocalPhotos([toProduct(doc as unknown as Record<string, unknown>)])
      return product ?? fallback
    },
    fallback,
  )
})

export const getRelatedProducts = cache(async (slug: string): Promise<ProductView[]> => {
  const products = await getProducts()
  return products.filter((product) => product.slug !== slug)
})
