import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { formatPhone, telHref } from '@/lib/utils'
import type { CtaBand as CtaBandContent, SiteSettingsView } from '@/types/content'

/** Full-width navy band closing a page. */
export function CtaBand({
  band,
  settings,
}: {
  band: CtaBandContent
  settings: SiteSettingsView
}) {
  const numbers = band.showPhoneNumbers
    ? ([settings.phonePrimary, settings.phoneSecondary].filter(Boolean) as string[])
    : []

  return (
    <section className="bg-navy text-white">
      <Container className="flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
        <div className="max-w-2xl">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {band.heading}
          </h2>
          {band.text ? <p className="mt-3 text-sm leading-relaxed text-white/80">{band.text}</p> : null}

          {numbers.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {numbers.map((number) => (
                <a
                  key={number}
                  href={telHref(number)}
                  className="flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-green"
                >
                  <Icon name="phone" className="h-4 w-4 text-green" />
                  {formatPhone(number)}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <ButtonLink href={band.buttonHref} size="lg" className="shrink-0">
          {band.buttonLabel}
          <Icon name="arrow-right" className="h-4 w-4" />
        </ButtonLink>
      </Container>
    </section>
  )
}
