import { Icon } from '@/components/ui/Icon'
import type { ProductView } from '@/types/content'

export function ApplicationList({ applications }: { applications: ProductView['applications'] }) {
  if (applications.length === 0) return null

  return (
    <ul className="space-y-3">
      {applications.map((item) => (
        <li key={item.application} className="flex gap-3 text-sm">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-green" />
          <span>
            <span className="font-medium text-navy">{item.application}</span>
            {item.note ? <span className="text-muted"> — {item.note}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  )
}
