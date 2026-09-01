import { cn } from '@/lib/utils'
import { formatDayHours, nowInTimezone } from '@/lib/working-hours'
import type { WorkingHoursView } from '@/types/content'

/** Day / timing / status table, driven by the working-hours global. */
export function WorkingHoursTable({ hours }: { hours: WorkingHoursView }) {
  const today = nowInTimezone().day

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Working hours</caption>
        <thead>
          <tr className="bg-navy text-white">
            <th scope="col" className="px-5 py-3 font-semibold">Day</th>
            <th scope="col" className="px-5 py-3 font-semibold">Timing</th>
            <th scope="col" className="px-5 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {hours.days.map((day) => {
            const isToday = day.day === today

            return (
              <tr
                key={day.day}
                className={cn('border-t border-line', isToday ? 'bg-green/5' : 'bg-white')}
              >
                <th scope="row" className="px-5 py-3 font-medium text-navy">
                  {day.label}
                  {isToday ? (
                    <span className="ml-2 rounded-full bg-green/15 px-2 py-0.5 text-[11px] font-semibold text-green-dark">
                      Today
                    </span>
                  ) : null}
                </th>
                <td className="px-5 py-3 text-muted">{formatDayHours(day)}</td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      'text-xs font-semibold',
                      day.isClosed ? 'text-muted' : 'text-green-dark',
                    )}
                  >
                    {day.isClosed ? 'Closed' : 'Open'}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {hours.note ? <p className="border-t border-line bg-surface px-5 py-3 text-xs text-muted">{hours.note}</p> : null}
    </div>
  )
}
