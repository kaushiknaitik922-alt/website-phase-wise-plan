import { AboutSnippet } from '@/components/sections/AboutSnippet'
import { CtaBand } from '@/components/sections/CtaBand'
import { FeatureCards } from '@/components/sections/FeatureCards'
import { Hero } from '@/components/sections/Hero'
import { ProcessStrip } from '@/components/sections/ProcessStrip'
import { ProductGrid } from '@/components/sections/ProductGrid'
import { SupplyArea } from '@/components/sections/SupplyArea'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { JsonLd } from '@/components/ui/JsonLd'
import { organizationJsonLd } from '@/lib/seo'
import { getFeaturedProducts, getHomePage, getSiteSettings } from '@/server/queries'

export default async function HomePage() {
  const [home, products, settings] = await Promise.all([
    getHomePage(),
    getFeaturedProducts(),
    getSiteSettings(),
  ])

  return (
    <>
      <JsonLd data={organizationJsonLd(settings)} />
      <Hero hero={home.hero} />
      <FeatureCards cards={home.featureCards} />
      <AboutSnippet content={home.aboutSnippet} experienceYears={settings.experienceYears} />
      <ProductGrid
        kicker={home.productsSection.kicker}
        heading={home.productsSection.heading}
        intro={home.productsSection.intro}
        products={products}
      />
      <WhyChooseUs content={home.whyChooseUs} />
      <ProcessStrip content={home.processStrip} />
      <SupplyArea
        heading={home.supplyArea.heading}
        text={home.supplyArea.text}
        areas={settings.supplyAreas}
      />
      <CtaBand band={home.ctaBand} settings={settings} />
    </>
  )
}
