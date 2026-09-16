import type { Metadata } from 'next'

import { CtaBand } from '@/components/sections/CtaBand'
import { Faq } from '@/components/sections/Faq'
import { PageHero } from '@/components/sections/PageHero'
import { JsonLd } from '@/components/ui/JsonLd'
import { defaultHomePage, defaultProductFaqs } from '@/config/content'
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from '@/lib/seo'
import { getSiteSettings } from '@/server/queries'

const description =
  'Minimum order, packing, samples, transport and supply area — the things buyers check before they call us about recycled PP granules, HDPE sheets or RO filter housing bottles.'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return buildMetadata({
    title: 'Frequently Asked Questions',
    description,
    path: '/faq',
    settings,
  })
}

export default async function FaqPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <JsonLd data={faqJsonLd(defaultProductFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ])}
      />

      <PageHero
        hero={{
          kicker: 'FAQ',
          heading: 'Questions buyers ask',
          subheading: description,
        }}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <Faq heading="Ordering, packing and supply" items={defaultProductFaqs} />

      <CtaBand band={defaultHomePage.ctaBand} settings={settings} />
    </>
  )
}
