import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import type { IconCard } from '@/types/content'

/** Three cards that overlap the bottom of the hero on large screens. */
export function FeatureCards({ cards }: { cards: IconCard[] }) {
  if (cards.length === 0) return null

  return (
    <Container className="relative z-10 -mt-8 lg:-mt-14">
      <ul className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.heading}
            className="rounded-lg border border-line bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-raised"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-green/10 text-green-dark">
              <Icon name={card.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-navy">{card.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.text}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}
