import { Container } from '@/components/ui/Container'
import { formatPhone, telHref } from '@/lib/utils'
import type { SiteSettingsView, WorkingHoursView } from '@/types/content'

import { hoursSummary } from '@/lib/working-hours'

/** Thin navy strip above the header: tagline, hours summary, both numbers. */
export function TopBar({
  settings,
  hours,
}: {
  settings: SiteSettingsView
  hours: WorkingHoursView
}) {
  const numbers = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean) as string[]

  return (
    <div className="bg-navy-dark text-white/80">
      <Container className="flex flex-col gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="tracking-wide">{settings.tagline}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="hidden sm:inline">{hoursSummary(hours)}</span>
          {numbers.map((number) => (
            <a
              key={number}
              href={telHref(number)}
              className="font-medium text-white transition-colors hover:text-green"
            >
              {formatPhone(number)}
            </a>
          ))}
        </div>
      </Container>
    </div>
  )
}
