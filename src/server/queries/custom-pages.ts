import { cache } from 'react'

import { fromCms } from '@/server/payload'
import type { CustomPageView, RichTextValue } from '@/types/content'

import { toImage, toSeo } from './mappers'

/**
 * Pages the client adds from the CMS. Unlike every other read on the site these
 * have no built-in fallback — a page that is not in the CMS does not exist, so
 * an empty list is the right answer rather than a sign of trouble.
 */
const toPage = (doc: Record<string, unknown>): CustomPageView => ({
  title: (doc.title as string) ?? '',
  slug: (doc.slug as string) ?? '',
  kicker: (doc.kicker as string) ?? null,
  subheading: (doc.subheading as string) ?? null,
  image: toImage(doc.image, 'hero'),
  body: doc.body as RichTextValue,
  showInFooter: doc.showInFooter === true,
  seo: toSeo(doc.seo),
})

export const getCustomPages = cache(
  async (): Promise<CustomPageView[]> =>
    fromCms(
      'pages',
      async (payload) => {
        const result = await payload.find({
          collection: 'pages',
          where: { isPublished: { equals: true } },
          depth: 1,
          limit: 100,
          sort: 'title',
          overrideAccess: false,
        })

        return result.docs.map((doc) => toPage(doc as unknown as Record<string, unknown>))
      },
      [],
    ),
)

export const getCustomPageBySlug = cache(async (slug: string): Promise<CustomPageView | null> =>
  fromCms(
    `page:${slug}`,
    async (payload) => {
      const result = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug }, isPublished: { equals: true } },
        depth: 1,
        limit: 1,
        overrideAccess: false,
      })

      const doc = result.docs[0]
      return doc ? toPage(doc as unknown as Record<string, unknown>) : null
    },
    null,
  ),
)

export const getFooterPages = cache(async (): Promise<CustomPageView[]> => {
  const pages = await getCustomPages()
  return pages.filter((page) => page.showInFooter)
})
