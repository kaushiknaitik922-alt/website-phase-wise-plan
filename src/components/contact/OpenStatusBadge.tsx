'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { getOpenStatus } from '@/lib/working-hours'
import type { WorkingHoursView } from '@/types/content'

/**
 * Live Open / Closed badge.
 *
 * The server renders the status too, so the badge is correct in the HTML; the
 * client then keeps it in step as the day rolls on. Both sides compute it from
 * the same working-hours data in Asia/Kolkata, so the visitor's own timezone
 * never changes the answer.
 */
export function OpenStatusBadge({ hours, className }: { hours: WorkingHoursView; className?: string }) {
  const [status, setStatus] = useState(() => getOpenStatus(hours))

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(hours))
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [hours])

  return (
    <span className={cn('inline-flex items-center gap-2 text-sm', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
          status.isOpen ? 'bg-green/15 text-green-dark' : 'bg-navy/10 text-navy',
        )}
      >
        <span
          aria-hidden="true"
          className={cn('h-2 w-2 rounded-full', status.isOpen ? 'bg-green' : 'bg-navy/50')}
        />
        {status.isOpen ? 'Open now' : 'Closed now'}
      </span>
      {status.detail ? <span className="text-muted">{status.detail}</span> : null}
    </span>
  )
}
