import Image from 'next/image'
import type { Metadata } from 'next'

import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { RichText } from '@/components/ui/RichText'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildMetadata } from '@/lib/seo'
import { getProcessPage, getSiteSettings } from '@/server/queries'

export async function generateMetadata(): Promise<Metadata> {
  const [process, settings] = await Promise.all([getProcessPage(), getSiteSettings()])

  return buildMetadata({
    title: 'Our Process',
    description:
      process.intro ??
      process.hero.subheading ??
      'How industrial PP waste is collected, sorted, cleaned and granulated at our unit in Bawana.',
    path: '/process',
    seo: process.seo,
    settings,
  })
}

export default async function ProcessPage() {
  const [process, settings] = await Promise.all([getProcessPage(), getSiteSettings()])

  return (
    <>
      <PageHero
        hero={process.hero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Our Process' }]}
      />

      <section className="py-16 lg:py-20">
        <Container>
          {process.intro ? (
            <p className="max-w-prose text-base leading-relaxed text-muted">{process.intro}</p>
          ) : null}

          <ol className="mt-12 space-y-8">
            {process.steps.map((step, index) => (
              <li key={step.title} className="relative grid gap-6 sm:grid-cols-[auto,1fr] sm:gap-8">
                <div className="flex sm:flex-col sm:items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index < process.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="ml-4 h-px flex-1 self-center bg-line sm:ml-0 sm:mt-3 sm:h-full sm:w-px"
                    />
                  ) : null}
                </div>

                <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:pb-8">
                  <h2 className="font-display text-lg font-semibold text-navy">{step.title}</h2>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                  {step.image?.url ? (
                    <Image
                      src={step.image.url}
                      alt={step.image.alt}
                      width={720}
                      height={420}
                      className="mt-5 w-full rounded-md object-cover"
                    />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {process.dependability.heading ? (
        <section className="bg-surface py-16 lg:py-20">
          <Container>
            <SectionHeading heading={process.dependability.heading} />
            <RichText value={process.dependability.body} className="mt-6" />
          </Container>
        </section>
      ) : null}

      <CtaBand band={process.ctaBand} settings={settings} />
    </>
  )
}
