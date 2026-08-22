import { cn } from '@/lib/utils'

type Colour = { name: string; hexCode: string }

/**
 * Colour swatches. The dot is an on-screen indication only — shade matching is
 * always confirmed against a physical sample.
 */
export function ColourSwatches({
  colours,
  size = 'md',
  className,
}: {
  colours: Colour[]
  size?: 'sm' | 'md'
  className?: string
}) {
  if (colours.length === 0) return null

  const dot = size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'

  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-3', className)}>
      {colours.map((colour) => (
        <li key={colour.name} className="flex items-center gap-2">
          <span
            className={cn('rounded-full border border-line shadow-sm', dot)}
            style={{ backgroundColor: colour.hexCode }}
            aria-hidden="true"
          />
          <span className={cn('text-muted', size === 'sm' ? 'text-xs' : 'text-sm')}>
            {colour.name}
          </span>
        </li>
      ))}
    </ul>
  )
}
