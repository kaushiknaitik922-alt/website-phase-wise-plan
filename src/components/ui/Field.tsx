import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

const controlClasses =
  'w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-green/40 disabled:bg-surface'

export function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy">
        {label}
        {required ? <span className="ml-0.5 text-green-dark">*</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

export function Input({ className, invalid, ...props }: ComponentProps<'input'> & { invalid?: boolean }) {
  return (
    <input
      className={cn(controlClasses, invalid ? 'border-red-500' : 'border-line', className)}
      {...props}
    />
  )
}

export function Textarea({
  className,
  invalid,
  ...props
}: ComponentProps<'textarea'> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(controlClasses, 'min-h-[7.5rem] resize-y', invalid ? 'border-red-500' : 'border-line', className)}
      {...props}
    />
  )
}

export function Select({
  className,
  invalid,
  children,
  ...props
}: ComponentProps<'select'> & { invalid?: boolean }) {
  return (
    <select
      className={cn(controlClasses, 'appearance-none pr-8', invalid ? 'border-red-500' : 'border-line', className)}
      {...props}
    >
      {children}
    </select>
  )
}
