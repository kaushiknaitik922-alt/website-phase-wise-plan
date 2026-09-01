import { cache } from 'react'

import {
  defaultAboutPage,
  defaultContactPage,
  defaultHomePage,
  defaultProcessPage,
} from '@/config/content'
import { fromCms } from '@/server/payload'
import type {
  AboutPageView,
  ContactPageView,
  HomePageView,
  ProcessPageView,
} from '@/types/content'

import { orDefault, toCtaBand, toHero, toIconCards, toImage, toSeo } from './mappers'

const group = (doc: Record<string, unknown>, key: string): Record<string, unknown> =>
  (doc[key] as Record<string, unknown>) ?? {}

export const getHomePage = cache(
  async (): Promise<HomePageView> =>
    fromCms(
      'home-page',
      async (payload) => {
        const doc = (await payload.findGlobal({
          slug: 'home-page',
          depth: 1,
          overrideAccess: false,
        })) as unknown as Record<string, unknown>

        const about = group(doc, 'aboutSnippet')
        const products = group(doc, 'productsSection')
        const why = group(doc, 'whyChooseUs')
        const process = group(doc, 'processStrip')
        const supply = group(doc, 'supplyArea')

        const steps = Array.isArray(process.steps) ? process.steps : []

        return {
          hero: toHero(doc.hero, defaultHomePage.hero),
          featureCards: toIconCards(doc.featureCards, defaultHomePage.featureCards),
          aboutSnippet: {
            kicker: orDefault(about.kicker as string, defaultHomePage.aboutSnippet.kicker),
            heading: orDefault(about.heading as string, defaultHomePage.aboutSnippet.heading),
            body: orDefault(about.body as string, defaultHomePage.aboutSnippet.body),
            image: toImage(about.image, 'card'),
            linkLabel: orDefault(about.linkLabel as string, defaultHomePage.aboutSnippet.linkLabel),
          },
          productsSection: {
            kicker: orDefault(products.kicker as string, defaultHomePage.productsSection.kicker),
            heading: orDefault(products.heading as string, defaultHomePage.productsSection.heading),
            intro: orDefault(products.intro as string, defaultHomePage.productsSection.intro ?? ''),
          },
          whyChooseUs: {
            kicker: orDefault(why.kicker as string, defaultHomePage.whyChooseUs.kicker),
            heading: orDefault(why.heading as string, defaultHomePage.whyChooseUs.heading),
            points: toIconCards(why.points, defaultHomePage.whyChooseUs.points),
          },
          processStrip: {
            kicker: orDefault(process.kicker as string, defaultHomePage.processStrip.kicker),
            heading: orDefault(process.heading as string, defaultHomePage.processStrip.heading),
            steps:
              steps.length > 0
                ? steps.map((step) => {
                    const row = step as Record<string, unknown>
                    return { title: (row.title as string) ?? '', text: (row.text as string) ?? '' }
                  })
                : defaultHomePage.processStrip.steps,
            linkLabel: orDefault(
              process.linkLabel as string,
              defaultHomePage.processStrip.linkLabel,
            ),
          },
          supplyArea: {
            heading: orDefault(supply.heading as string, defaultHomePage.supplyArea.heading),
            text: orDefault(supply.text as string, defaultHomePage.supplyArea.text),
          },
          ctaBand: toCtaBand(doc.ctaBand, defaultHomePage.ctaBand),
        }
      },
      defaultHomePage,
    ),
)

export const getAboutPage = cache(
  async (): Promise<AboutPageView> =>
    fromCms(
      'about-page',
      async (payload) => {
        const doc = (await payload.findGlobal({
          slug: 'about-page',
          depth: 1,
          overrideAccess: false,
        })) as unknown as Record<string, unknown>

        const sections = Array.isArray(doc.sections) ? doc.sections : []

        return {
          hero: toHero(doc.hero, defaultAboutPage.hero),
          sections:
            sections.length > 0
              ? sections.map((section) => {
                  const row = section as Record<string, unknown>
                  return {
                    heading: (row.heading as string) ?? '',
                    body: row.body as AboutPageView['sections'][number]['body'],
                    image: toImage(row.image, 'card'),
                    imagePosition: (row.imagePosition as 'left' | 'right') ?? 'right',
                  }
                })
              : defaultAboutPage.sections,
          ctaBand: toCtaBand(doc.ctaBand, defaultAboutPage.ctaBand),
          seo: toSeo(doc.seo),
        }
      },
      defaultAboutPage,
    ),
)

export const getProcessPage = cache(
  async (): Promise<ProcessPageView> =>
    fromCms(
      'process-page',
      async (payload) => {
        const doc = (await payload.findGlobal({
          slug: 'process-page',
          depth: 1,
          overrideAccess: false,
        })) as unknown as Record<string, unknown>

        const steps = Array.isArray(doc.steps) ? doc.steps : []
        const dependability = group(doc, 'dependability')

        return {
          hero: toHero(doc.hero, defaultProcessPage.hero),
          intro: orDefault(doc.intro as string, defaultProcessPage.intro ?? ''),
          steps:
            steps.length > 0
              ? steps.map((step) => {
                  const row = step as Record<string, unknown>
                  return {
                    title: (row.title as string) ?? '',
                    description: (row.description as string) ?? '',
                    image: toImage(row.image, 'card'),
                  }
                })
              : defaultProcessPage.steps,
          dependability: {
            heading: orDefault(
              dependability.heading as string,
              defaultProcessPage.dependability.heading,
            ),
            body: orDefault(
              dependability.body as ProcessPageView['dependability']['body'],
              defaultProcessPage.dependability.body,
            ),
          },
          ctaBand: toCtaBand(doc.ctaBand, defaultProcessPage.ctaBand),
          seo: toSeo(doc.seo),
        }
      },
      defaultProcessPage,
    ),
)

export const getContactPage = cache(
  async (): Promise<ContactPageView> =>
    fromCms(
      'contact-page',
      async (payload) => {
        const doc = (await payload.findGlobal({
          slug: 'contact-page',
          depth: 1,
          overrideAccess: false,
        })) as unknown as Record<string, unknown>

        return {
          hero: toHero(doc.hero, defaultContactPage.hero),
          intro: orDefault(doc.intro as string, defaultContactPage.intro ?? ''),
          formHeading: orDefault(doc.formHeading as string, defaultContactPage.formHeading),
          formIntro: orDefault(doc.formIntro as string, defaultContactPage.formIntro ?? ''),
          directionsNote: orDefault(
            doc.directionsNote as string,
            defaultContactPage.directionsNote ?? '',
          ),
          thankYouMessage: orDefault(
            doc.thankYouMessage as string,
            defaultContactPage.thankYouMessage,
          ),
          seo: toSeo(doc.seo),
        }
      },
      defaultContactPage,
    ),
)
