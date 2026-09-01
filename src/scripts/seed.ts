/**
 * Seeds the CMS with the default website content and, if asked, the first
 * admin user.
 *
 *   npm run seed
 *   SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD='...' npm run seed
 *
 * Safe to run more than once: products are matched by slug and updated rather
 * than duplicated, and globals are overwritten with the defaults.
 */
import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

import {
  defaultAboutPage,
  defaultContactPage,
  defaultHomePage,
  defaultProcessPage,
  defaultProducts,
} from '../config/content'
import { defaultWorkingHours, site } from '../config/site'
import { textToLexical } from '../lib/lexical'

// Next.js reads .env.local; this script runs outside Next, so load it by hand.
loadEnv({ path: ['.env.local', '.env'] })

const run = async () => {
  if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI is not set — copy .env.example to .env.local first.')
  }

  // Imported lazily so the environment is loaded before the config is read.
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  // --- First admin user -----------------------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD

  if (email && password) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'Administrator', role: 'admin' },
      })
      payload.logger.info(`Created admin user: ${email}`)
    } else {
      payload.logger.info(`Admin user already exists: ${email}`)
    }
  } else {
    payload.logger.info(
      'Skipping admin user (set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to create one).',
    )
  }

  // --- Site settings --------------------------------------------------------
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: site.companyName,
      tagline: site.tagline,
      experienceYears: site.experienceYears,
      footerAbout: site.footerAbout,
      phonePrimary: site.phonePrimary,
      phoneSecondary: site.phoneSecondary,
      whatsappPrimary: site.whatsappPrimary,
      whatsappSecondary: site.whatsappSecondary,
      addressLines: site.addressLines.map((line) => ({ line })),
      supplyAreas: site.supplyAreas.map((area) => ({ area })),
      defaultSeo: {
        metaTitle: `${site.companyName} — ${site.tagline}`,
        metaDescription: site.footerAbout,
      },
    },
  })

  // --- Working hours --------------------------------------------------------
  await payload.updateGlobal({
    slug: 'working-hours',
    data: {
      days: defaultWorkingHours.map((day) => ({
        day: day.day,
        isClosed: day.isClosed,
        openTime: day.openTime,
        closeTime: day.closeTime,
      })),
    },
  })

  // --- Home page ------------------------------------------------------------
  const home = defaultHomePage
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        kicker: home.hero.kicker,
        heading: home.hero.heading,
        subheading: home.hero.subheading,
        primaryCtaLabel: home.hero.primaryCtaLabel,
        primaryCtaHref: home.hero.primaryCtaHref,
        secondaryCtaLabel: home.hero.secondaryCtaLabel,
        secondaryCtaHref: home.hero.secondaryCtaHref,
      },
      featureCards: home.featureCards,
      aboutSnippet: home.aboutSnippet,
      productsSection: home.productsSection,
      whyChooseUs: home.whyChooseUs,
      processStrip: home.processStrip,
      supplyArea: home.supplyArea,
      ctaBand: home.ctaBand,
    },
  })

  // --- About page -----------------------------------------------------------
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      hero: {
        kicker: defaultAboutPage.hero.kicker,
        heading: defaultAboutPage.hero.heading,
        subheading: defaultAboutPage.hero.subheading,
      },
      sections: defaultAboutPage.sections.map((section) => ({
        heading: section.heading,
        body: textToLexical(String(section.body ?? '')),
        imagePosition: section.imagePosition,
      })),
      ctaBand: defaultAboutPage.ctaBand,
    },
  })

  // --- Process page ---------------------------------------------------------
  await payload.updateGlobal({
    slug: 'process-page',
    data: {
      hero: {
        kicker: defaultProcessPage.hero.kicker,
        heading: defaultProcessPage.hero.heading,
        subheading: defaultProcessPage.hero.subheading,
      },
      intro: defaultProcessPage.intro,
      steps: defaultProcessPage.steps.map((step) => ({
        title: step.title,
        description: step.description,
      })),
      dependability: {
        heading: defaultProcessPage.dependability.heading,
        body: textToLexical(String(defaultProcessPage.dependability.body ?? '')),
      },
      ctaBand: defaultProcessPage.ctaBand,
    },
  })

  // --- Contact page ---------------------------------------------------------
  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      hero: {
        kicker: defaultContactPage.hero.kicker,
        heading: defaultContactPage.hero.heading,
        subheading: defaultContactPage.hero.subheading,
      },
      intro: defaultContactPage.intro,
      formHeading: defaultContactPage.formHeading,
      formIntro: defaultContactPage.formIntro,
      thankYouMessage: defaultContactPage.thankYouMessage,
    },
  })

  // --- Products -------------------------------------------------------------
  for (const product of defaultProducts) {
    const data = {
      title: product.title,
      slug: product.slug,
      category: product.category as 'pp-granules' | 'hdpe-sheets' | 'ro-filter-housing',
      shortDescription: product.shortDescription,
      overview: textToLexical(String(product.overview ?? '')),
      packingSupply: textToLexical(String(product.packingSupply ?? '')),
      colours: product.colours,
      specifications: product.specifications,
      applications: product.applications,
      buyerTypes: product.buyerTypes.map((buyerType) => ({ buyerType })),
      displayOrder: product.displayOrder,
      isFeatured: product.isFeatured,
    }

    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: product.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'products', id: existing.docs[0].id, data })
      payload.logger.info(`Updated product: ${product.title}`)
    } else {
      await payload.create({ collection: 'products', data })
      payload.logger.info(`Created product: ${product.title}`)
    }
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
