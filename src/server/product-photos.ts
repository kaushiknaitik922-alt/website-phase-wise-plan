import 'server-only'

import { existsSync } from 'fs'
import path from 'path'

import type { ImageView, ProductView } from '@/types/content'

/**
 * Photographs committed to the repository, as a stand-in until images are
 * uploaded through the CMS.
 *
 * Drop a file at `public/products/<product-slug>.jpg` (or .jpeg / .png / .webp)
 * and it shows up on the product card and the product page. Anything uploaded
 * in the CMS wins over it.
 *
 * The file is looked up on disk rather than hardcoded, so a missing photo can
 * never leave a broken image on the page.
 */
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'] as const

const cache = new Map<string, ImageView>()

export const localProductPhoto = (slug: string, title: string): ImageView => {
  if (cache.has(slug)) return cache.get(slug) ?? null

  const found = EXTENSIONS.map((extension) => `products/${slug}.${extension}`).find((relative) =>
    existsSync(path.join(process.cwd(), 'public', relative)),
  )

  const image: ImageView = found
    ? { url: `/${found}`, alt: `${title} manufactured by Shri Lakhdatar Industries` }
    : null

  cache.set(slug, image)
  return image
}

/** Fills in a hero image for any product that has none in the CMS. */
export const withLocalPhotos = (products: ProductView[]): ProductView[] =>
  products.map((product) =>
    product.heroImage
      ? product
      : { ...product, heroImage: localProductPhoto(product.slug, product.title) },
  )
