import 'server-only'

import { existsSync } from 'fs'
import path from 'path'
import sharp from 'sharp'

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
 * never leave a broken image on the page. Dimensions are read from the file so
 * the page knows whether it is dealing with a portrait or a landscape shot.
 */
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'] as const

const cache = new Map<string, ImageView>()

export const localProductPhoto = async (slug: string, title: string): Promise<ImageView> => {
  if (cache.has(slug)) return cache.get(slug) ?? null

  const found = EXTENSIONS.map((extension) => `products/${slug}.${extension}`).find((relative) =>
    existsSync(path.join(process.cwd(), 'public', relative)),
  )

  let image: ImageView = null

  if (found) {
    let width: number | null = null
    let height: number | null = null

    try {
      const metadata = await sharp(path.join(process.cwd(), 'public', found)).metadata()
      width = metadata.width ?? null
      height = metadata.height ?? null
    } catch (error) {
      console.error(`[photos] Could not read dimensions for ${found}:`, error)
    }

    image = {
      url: `/${found}`,
      alt: `${title} manufactured by Shri Lakhdatar Industries`,
      width,
      height,
    }
  }

  cache.set(slug, image)
  return image
}

/** Fills in a hero image for any product that has none in the CMS. */
export const withLocalPhotos = async (products: ProductView[]): Promise<ProductView[]> =>
  Promise.all(
    products.map(async (product) =>
      product.heroImage
        ? product
        : { ...product, heroImage: await localProductPhoto(product.slug, product.title) },
    ),
  )

/**
 * How a photograph should sit in a fixed frame.
 *
 * Filling the frame crops whatever does not fit, which is fine when the
 * photograph is roughly the frame's shape and ruinous when it is not — a tall
 * bottle loses its cap and base, a wide workshop shot loses its subject. So a
 * photograph that is close to the frame's proportions fills it, and one that
 * is not is shown whole instead.
 */
export const objectFitFor = (
  image: ImageView,
  frameAspect: number,
  tolerance = 0.15,
): 'cover' | 'contain' => {
  if (!image?.width || !image?.height) return 'cover'
  const drift = Math.abs(image.width / image.height - frameAspect) / frameAspect
  return drift > tolerance ? 'contain' : 'cover'
}

/** The frames photographs are shown in. */
export const HERO_ASPECT = 16 / 10
export const CARD_ASPECT = 4 / 3
