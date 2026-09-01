import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-green text-white hover:bg-green-dark',
  secondary: 'bg-navy text-white hover:bg-navy-light',
  outline: 'border border-white/60 text-white hover:bg-white hover:text-navy',
  ghost: 'border border-line text-navy hover:border-navy hover:bg-surface',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

type ButtonStyleProps = { variant?: Variant; size?: Size; className?: string }

export const buttonClass = ({ variant = 'primary', size = 'md', className }: ButtonStyleProps = {}) =>
  cn(base, variants[variant], sizes[size], className)

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonStyleProps & ComponentProps<'button'> & { children: ReactNode }) {
  return (
    <button className={buttonClass({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonStyleProps & ComponentProps<typeof Link> & { children: ReactNode }) {
  return (
    <Link href={href} className={buttonClass({ variant, size, className })} {...props}>
      {children}
    </Link>
  )
}
