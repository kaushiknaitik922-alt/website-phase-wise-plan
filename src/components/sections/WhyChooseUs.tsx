import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { HomePageView } from '@/types/content'

export function WhyChooseUs({ content }: { content: HomePageView['whyChooseUs'] }) {
  if (content.points.length === 0) return null

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading kicker={content.kicker} heading={content.heading} />
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {content.points.map((point) => (
            <li key={point.heading} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-navy">
                <Icon name={point.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-navy">{point.heading}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
