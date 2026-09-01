import Image from 'next/image'
import type { Metadata } from 'next'

import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { RichText } from '@/components/ui/RichText'
import { richTextToPlainText } from '@/lib/lexical'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { getAboutPage, getSiteSettings } from '@/server/queries'

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()])

  return buildMetadata({
    title: 'About Us',
    description:
      about.hero.subheading ??
      richTextToPlainText(about.sections[0]?.body, 155) ??
      settings.footerAbout,
    path: '/about',
    seo: about.seo,
    settings,
  })
}

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()])

  return (
    <>
      <PageHero hero={about.hero} breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

      <div className="py-16 lg:py-20">
        <Container className="space-y-14 lg:space-y-20">
          {about.sections.map((section, index) => {
            const hasImage = Boolean(section.image?.url)

            return (
              <section
                key={section.heading}
                className={cn(
                  'grid items-start gap-8',
                  hasImage
                    ? 'lg:grid-cols-2 lg:gap-12'
                    : // Text-only sections read better as heading beside body
                      // than as one narrow column on a wide screen.
                      'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14',
                )}
              >
                <div className={cn(hasImage && section.imagePosition === 'left' && 'lg:order-2')}>
                  <h2 className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                    {section.heading}
                  </h2>
                  <span className="mt-3 block h-1 w-12 rounded-full bg-green" />
                  {hasImage ? <RichText value={section.body} className="mt-5" /> : null}
                </div>

                {hasImage ? null : <RichText value={section.body} className="max-w-none" />}

                {hasImage ? (
                  <Image
                    src={section.image!.url}
                    alt={section.image!.alt}
                    width={720}
                    height={520}
                    className={cn(
                      'w-full rounded-lg object-cover shadow-card',
                      section.imagePosition === 'left' && 'lg:order-1',
                    )}
                  />
                ) : null}
              </section>
            )
          })}

          <section className="rounded-lg border border-line bg-surface p-8">
            <h2 className="font-display text-base font-semibold text-navy">At a glance</h2>
            <dl className="mt-5 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">Experience</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-navy">
                  {settings.experienceYears}+ years
                  {settings.establishedYear ? ` · since ${settings.establishedYear}` : ''}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">Factory</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-navy">
                  {settings.addressLines.join(', ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">We supply</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-navy">
                  Businesses only
                </dd>
              </div>
            </dl>
          </section>
        </Container>
      </div>

      <CtaBand band={about.ctaBand} settings={settings} />
    </>
  )
}
