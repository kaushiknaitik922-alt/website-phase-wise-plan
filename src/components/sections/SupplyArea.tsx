import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'

export function SupplyArea({
  heading,
  text,
  areas,
}: {
  heading: string
  text: string
  areas: string[]
}) {
  return (
    <section className="border-y border-line py-10">
      <Container className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <Icon name="truck" className="mt-0.5 h-6 w-6 shrink-0 text-green" />
          <div>
            <h2 className="font-display text-base font-semibold text-navy">{heading}</h2>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-navy"
            >
              {area}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
