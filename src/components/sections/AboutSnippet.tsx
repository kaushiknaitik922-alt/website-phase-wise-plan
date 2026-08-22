import Image from 'next/image'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { HomePageView } from '@/types/content'

export function AboutSnippet({
  content,
  experienceYears,
}: {
  content: HomePageView['aboutSnippet']
  experienceYears: number
}) {
  const paragraphs = content.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading kicker={content.kicker} heading={content.heading} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href="/about" variant="ghost" size="md" className="mt-7 bg-white">
            {content.linkLabel}
            <Icon name="arrow-right" className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="relative">
          {content.image ? (
            <Image
              src={content.image.url}
              alt={content.image.alt}
              width={720}
              height={540}
              className="w-full rounded-lg object-cover shadow-card"
            />
          ) : (
            <div className="rounded-lg border border-line bg-white p-8 shadow-card">
              <p className="font-display text-5xl font-bold text-navy">{experienceYears}+</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-green-dark">
                Years in the trade
              </p>
              <dl className="mt-8 space-y-5 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="font-semibold text-navy">Factory</dt>
                  <dd className="mt-1 text-muted">Sector 5, Bawana, New Delhi</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">We supply to</dt>
                  <dd className="mt-1 text-muted">Businesses only — no retail sales</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">Product lines</dt>
                  <dd className="mt-1 text-muted">
                    Recycled PP granules · HDPE sheets · RO filter housing bottles
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
