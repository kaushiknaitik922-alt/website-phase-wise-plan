import type { Metadata } from 'next'

import { ProductCard } from '@/components/product/ProductCard'
import { CtaBand } from '@/components/sections/CtaBand'
import { Faq } from '@/components/sections/Faq'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/ui/JsonLd'
import { defaultHomePage, defaultProductFaqs } from '@/config/content'
import { buildMetadata, faqJsonLd } from '@/lib/seo'
import { getProducts, getSiteSettings } from '@/server/queries'

const description =
  'Recycled PP granules, HDPE sheets and RO filter housing bottles, manufactured and supplied in bulk to B2B buyers across North India.'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return buildMetadata({
    title: 'Products',
    description,
    path: '/products',
    settings,
  })
}

export default async function ProductsPage() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()])

  return (
    <>
      <JsonLd data={faqJsonLd(defaultProductFaqs)} />
      <PageHero
        hero={{
          kicker: 'Our Products',
          heading: 'Three product lines, supplied in bulk',
          subheading: description,
        }}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </ul>

          <p className="mt-10 max-w-prose text-sm leading-relaxed text-muted">
            Each line is manufactured separately. Sizes, packing and minimum order quantity are
            confirmed at the time of quoting — send us your requirement and we will come back with
            the details.
          </p>
        </Container>
      </section>

      <Faq
        intro="Packing, minimum order, delivery and samples — the things buyers check before they call."
        items={defaultProductFaqs}
      />

      <CtaBand band={defaultHomePage.ctaBand} settings={settings} />
    </>
  )
}
