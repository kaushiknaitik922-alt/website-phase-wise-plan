import type { Metadata } from 'next'

import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { MapEmbed } from '@/components/contact/MapEmbed'
import { OpenStatusBadge } from '@/components/contact/OpenStatusBadge'
import { WorkingHoursTable } from '@/components/contact/WorkingHoursTable'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { buildMetadata } from '@/lib/seo'
import { formatPhone, telHref } from '@/lib/utils'
import { productEnquiryMessage, whatsappHref } from '@/lib/whatsapp'
import { getContactPage, getProducts, getSiteSettings, getWorkingHours } from '@/server/queries'

type SearchParams = { searchParams: Promise<{ product?: string }> }

export async function generateMetadata(): Promise<Metadata> {
  const [contact, settings] = await Promise.all([getContactPage(), getSiteSettings()])

  return buildMetadata({
    title: 'Contact',
    description:
      contact.intro ??
      `Call, WhatsApp or send an enquiry to ${settings.companyName}, ${settings.addressLines.join(', ')}.`,
    path: '/contact',
    seo: contact.seo,
    settings,
  })
}

export default async function ContactPage({ searchParams }: SearchParams) {
  const [{ product: productParam }, contact, settings, hours, products] = await Promise.all([
    searchParams,
    getContactPage(),
    getSiteSettings(),
    getWorkingHours(),
    getProducts(),
  ])

  const selectedProduct = products.find((product) => product.slug === productParam)
  const numbers = [
    { number: settings.phonePrimary, whatsapp: settings.whatsappPrimary || settings.phonePrimary },
    settings.phoneSecondary
      ? {
          number: settings.phoneSecondary,
          whatsapp: settings.whatsappSecondary || settings.phoneSecondary,
        }
      : null,
  ].filter(Boolean) as { number: string; whatsapp: string }[]

  return (
    <>
      <PageHero
        hero={contact.hero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="space-y-10">
            <div>
              <OpenStatusBadge hours={hours} />
              {contact.intro ? (
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
                  {contact.intro}
                </p>
              ) : null}
            </div>

            <div className="space-y-4">
              {numbers.map(({ number, whatsapp }) => (
                <div
                  key={number}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4 shadow-card"
                >
                  <a
                    href={telHref(number)}
                    className="flex items-center gap-3 font-display text-lg font-semibold text-navy transition-colors hover:text-green-dark"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-navy">
                      <Icon name="phone" className="h-4 w-4" />
                    </span>
                    {formatPhone(number)}
                  </a>
                  <a
                    href={whatsappHref(
                      whatsapp,
                      productEnquiryMessage(settings.companyName, selectedProduct?.title),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-green px-4 py-2 text-sm font-semibold text-green-dark transition-colors hover:bg-green hover:text-white"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              ))}

              {settings.email ? (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 rounded-lg border border-line bg-white p-4 text-sm font-medium text-navy shadow-card transition-colors hover:text-green-dark"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
                    <Icon name="mail" className="h-4 w-4" />
                  </span>
                  {settings.email}
                </a>
              ) : null}
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-navy">Working hours</h2>
              <p className="mt-1 text-sm text-muted">All timings are India Standard Time.</p>
              <div className="mt-4">
                <WorkingHoursTable hours={hours} />
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-navy">Factory location</h2>
              <div className="mt-4">
                <MapEmbed
                  embedUrl={settings.googleMapsEmbedUrl}
                  addressLines={settings.addressLines}
                  directionsNote={contact.directionsNote}
                />
              </div>
            </div>
          </div>

          <div className="lg:pl-2">
            <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-navy">
                {contact.formHeading}
              </h2>
              <span className="mt-3 block h-1 w-12 rounded-full bg-green" />
              {contact.formIntro ? (
                <p className="mt-4 text-sm text-muted">{contact.formIntro}</p>
              ) : null}

              <div className="mt-6">
                <EnquiryForm
                  products={products.map((product) => ({
                    slug: product.slug,
                    title: product.title,
                  }))}
                  defaultProduct={selectedProduct?.slug}
                  thankYouMessage={contact.thankYouMessage}
                  source={selectedProduct ? 'product-page' : 'contact-page'}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
