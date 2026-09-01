import { cn } from '@/lib/utils'

/**
 * Small kicker, heading and an accent underline — the section header pattern
 * used on every page.
 */
export function SectionHeading({
  kicker,
  heading,
  intro,
  align = 'left',
  tone = 'dark',
  className,
  as: Tag = 'h2',
}: {
  kicker?: string
  heading: string
  intro?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {kicker ? (
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.18em]',
            tone === 'dark' ? 'text-green' : 'text-green/90',
          )}
        >
          {kicker}
        </p>
      ) : null}
      <Tag
        className={cn(
          'mt-2 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl',
          tone === 'dark' ? 'text-navy' : 'text-white',
        )}
      >
        {heading}
      </Tag>
      <span
        className={cn(
          'mt-4 block h-1 w-16 rounded-full bg-green',
          align === 'center' && 'mx-auto',
        )}
      />
      {intro ? (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed',
            tone === 'dark' ? 'text-muted' : 'text-white/80',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
