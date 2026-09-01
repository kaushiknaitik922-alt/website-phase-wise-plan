import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { HomePageView } from '@/types/content'

/** Horizontal numbered flow of the recycling process. */
export function ProcessStrip({ content }: { content: HomePageView['processStrip'] }) {
  if (content.steps.length === 0) return null

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <SectionHeading kicker={content.kicker} heading={content.heading} align="center" />

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-lg border border-line bg-white p-6 shadow-card"
            >
              <span className="font-display text-3xl font-bold leading-none text-green/25">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-navy">{step.title}</h3>
              {step.text ? (
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-8 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-dark transition-colors hover:text-navy"
          >
            {content.linkLabel}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
