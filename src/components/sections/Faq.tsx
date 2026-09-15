import { Container } from '@/components/ui/Container'
import type { FaqItem } from '@/types/content'

/**
 * Buyer questions, answered in full on the page. Everything stays open — these
 * are short answers a buyer should be able to skim, and search engines read
 * what is rendered.
 */
export function Faq({
  heading = 'Questions buyers ask',
  intro,
  items,
}: {
  heading?: string
  intro?: string
  items: FaqItem[]
}) {
  if (items.length === 0) return null

  return (
    <section className="border-t border-line bg-surface py-16 lg:py-20">
      <Container>
        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">{heading}</h2>
        {intro ? <p className="mt-3 max-w-prose text-muted">{intro}</p> : null}

        <dl className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.question} className="min-w-0">
              <dt className="font-display text-base font-semibold text-navy">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
