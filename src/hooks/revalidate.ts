import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Content saved in the CMS should be visible on the site immediately, so every
 * save clears the cache for the pages it can appear on.
 */
const revalidate = (paths: string[], tags: string[] = []) => {
  try {
    for (const path of paths) revalidatePath(path)
    for (const tag of tags) revalidateTag(tag)
  } catch {
    // Payload also runs outside a Next.js request (seed script, CLI), where
    // there is no cache to clear. Nothing to do in that case.
  }
}

export const revalidateProduct: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  const slugs = new Set<string>()
  if (typeof doc?.slug === 'string') slugs.add(doc.slug)
  if (typeof previousDoc?.slug === 'string') slugs.add(previousDoc.slug)

  revalidate(['/', '/products', ...Array.from(slugs, (slug) => `/products/${slug}`)], ['products'])
  req.payload.logger.info(`Revalidated product pages for: ${Array.from(slugs).join(', ')}`)
  return doc
}

export const revalidateProductAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidate(['/', '/products', `/products/${doc?.slug}`], ['products'])
  return doc
}

/** Globals that only affect one page. */
export const revalidateGlobal =
  (paths: string[], tags: string[] = []): GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidate(paths, tags)
    return doc
  }

/** Site settings and working hours appear in the shared header/footer. */
export const revalidateEverything: GlobalAfterChangeHook = ({ doc }) => {
  revalidate(['/', '/about', '/products', '/process', '/contact'], ['site-settings', 'working-hours'])
  return doc
}
