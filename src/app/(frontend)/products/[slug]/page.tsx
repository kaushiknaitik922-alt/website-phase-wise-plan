import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ApplicationList } from '@/components/product/ApplicationList'
import { ColourSwatches } from '@/components/product/ColourSwatches'
import { ProductCard } from '@/components/product/ProductCard'
import { SpecTable } from '@/components/product/SpecTable'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/ui/JsonLd'
import { RichText } from '@/components/ui/RichText'
import { defaultHomePage } from '@/config/content'
import { richTextToPlainText } from '@/lib/lexical'
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from '@/lib/seo'
import { cn, formatPhone, telHref } from '@/lib/utils'
import { productEnquiryMessage, whatsappHref } from '@/lib/whatsapp'
import { isPortrait } from '@/server/product-photos'
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getSiteSettings,
} from '@/server/queries'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])
  if (!product) return {}

  return buildMetadata({
    title: product.title,
    description: product.shortDescription || richTextToPlainText(product.overview, 155),
    path: `/products/${product.slug}`,
    seo: product.seo,
    settings,
  })
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])

  if (!product) notFound()

  const related = await getRelatedProducts(slug)
  const whatsapp = settings.whatsappPrimary || settings.phonePrimary
  const enquiryHref = `/contact?product=${encodeURIComponent(product.slug)}`

  return (
    <>
      <JsonLd
        data={productJsonLd({
          title: product.title,
          description: product.shortDescription || richTextToPlainText(product.overview, 300),
          slug: product.slug,
          image: product.heroImage?.url,
          settings,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.title, path: `/products/${product.slug}` },
        ])}
      />
      <PageHero
        hero={{
          kicker: 'Product',
          heading: product.title,
          subheading: product.shortDescription,
        }}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.title },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-12">
            {product.heroImage ? (
              // Fixed frame so the page holds its shape whatever the
              // photograph's own proportions are. A tall product is shown
              // whole inside it rather than cropped to a landscape band.
              <figure
                className={cn(
                  'relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line shadow-card',
                  isPortrait(product.heroImage) && 'bg-surface',
                )}
              >
                <Image
                  src={product.heroImage.url}
                  alt={product.heroImage.alt || product.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className={cn(
                    isPortrait(product.heroImage) ? 'object-contain p-4' : 'object-cover',
                  )}
                />
              </figure>
            ) : null}

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-navy">Overview</h2>
              <span className="mt-3 block h-1 w-12 rounded-full bg-green" />
              <RichText value={product.overview} className="mt-5 max-w-none" />
            </div>

            {product.colours.length > 0 ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-navy">
                  Available colours
                </h2>
                <span className="mt-3 block h-1 w-12 rounded-full bg-green" />
                <ColourSwatches colours={product.colours} className="mt-5" />
                <p className="mt-4 text-xs text-muted">
                  Swatches are indicative. Exact shade is confirmed against a physical sample.
                </p>
              </div>
            ) : null}

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-navy">
                Specifications
              </h2>
              <span className="mt-3 mb-5 block h-1 w-12 rounded-full bg-green" />
              <SpecTable specifications={product.specifications} />
            </div>

            {product.applications.length > 0 ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-navy">
                  Applications
                </h2>
                <span className="mt-3 mb-5 block h-1 w-12 rounded-full bg-green" />
                <ApplicationList applications={product.applications} />
              </div>
            ) : null}

            {product.buyerTypes.length > 0 ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-navy">
                  Who buys this
                </h2>
                <span className="mt-3 mb-5 block h-1 w-12 rounded-full bg-green" />
                <ul className="flex flex-wrap gap-2">
                  {product.buyerTypes.map((buyerType) => (
                    <li
                      key={buyerType}
                      className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-navy"
                    >
                      {buyerType}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-navy">
                Packing &amp; supply
              </h2>
              <span className="mt-3 block h-1 w-12 rounded-full bg-green" />
              <RichText value={product.packingSupply} className="mt-5 max-w-none" />
            </div>

            {product.gallery.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-3">
                {product.gallery.map((image) =>
                  image ? (
                    <li key={image.url}>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        width={600}
                        height={450}
                        className="w-full rounded-lg object-cover shadow-card"
                      />
                    </li>
                  ) : null,
                )}
              </ul>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-navy">
                Enquire about {product.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Tell us the colour and quantity you need and we will come back with a quote.
              </p>

              <ButtonLink href={enquiryHref} size="lg" className="mt-5 w-full">
                Get a Quote
                <Icon name="arrow-right" className="h-4 w-4" />
              </ButtonLink>

              <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                {[settings.phonePrimary, settings.phoneSecondary]
                  .filter(Boolean)
                  .map((number) => (
                    <a
                      key={number as string}
                      href={telHref(number as string)}
                      className="flex items-center gap-2 font-medium text-navy transition-colors hover:text-green-dark"
                    >
                      <Icon name="phone" className="h-4 w-4 text-green" />
                      {formatPhone(number as string)}
                    </a>
                  ))}
                <a
                  href={whatsappHref(whatsapp, productEnquiryMessage(settings.companyName, product.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-medium text-navy transition-colors hover:text-green-dark"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-green" />
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="bg-surface py-16 lg:py-20">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                Other products
              </h2>
              <Link
                href="/products"
                className="text-sm font-semibold text-green-dark transition-colors hover:text-navy"
              >
                View all
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand band={defaultHomePage.ctaBand} settings={settings} />
    </>
  )
}
