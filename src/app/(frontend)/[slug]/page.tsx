import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/ui/JsonLd'
import { RichText } from '@/components/ui/RichText'
import { defaultHomePage } from '@/config/content'
import { richTextToPlainText } from '@/lib/lexical'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { getCustomPageBySlug, getCustomPages } from '@/server/queries'
import { getSiteSettings } from '@/server/queries'

type Params = { params: Promise<{ slug: string }> }

/**
 * Pages the client writes in the CMS. Next.js prefers the fixed routes —
 * /about, /products, /faq and the rest — over this catch-all, so a CMS page can
 * never shadow one of them.
 */
export async function generateStaticParams() {
  const pages = await getCustomPages()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const [page, settings] = await Promise.all([getCustomPageBySlug(slug), getSiteSettings()])
  if (!page) return {}

  return buildMetadata({
    title: page.title,
    description: page.subheading || richTextToPlainText(page.body, 155) || settings.footerAbout,
    path: `/${page.slug}`,
    seo: page.seo,
    settings,
  })
}

export default async function CustomPage({ params }: Params) {
  const { slug } = await params
  const [page, settings] = await Promise.all([getCustomPageBySlug(slug), getSiteSettings()])

  if (!page) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: page.title, path: `/${page.slug}` },
        ])}
      />

      <PageHero
        hero={{
          kicker: page.kicker ?? undefined,
          heading: page.title,
          subheading: page.subheading ?? undefined,
        }}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: page.title }]}
      />

      <div className="py-16 lg:py-20">
        <Container className="space-y-10">
          {page.image?.url ? (
            <figure className="overflow-hidden rounded-lg border border-line bg-surface">
              <Image
                src={page.image.url}
                alt={page.image.alt || page.title}
                width={page.image.width ?? 1600}
                height={page.image.height ?? 900}
                className="h-auto w-full object-cover"
                priority
              />
            </figure>
          ) : null}

          <div className="max-w-prose">
            <RichText value={page.body} />
          </div>
        </Container>
      </div>

      <CtaBand band={defaultHomePage.ctaBand} settings={settings} />
    </>
  )
}
