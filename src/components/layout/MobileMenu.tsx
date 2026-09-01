'use client'

import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { mainNav } from '@/config/site'
import { cn } from '@/lib/utils'

export function MobileMenu({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean
  pathname: string
  onNavigate: () => void
}) {
  if (!open) return null

  return (
    <div id="mobile-menu" className="border-t border-white/10 bg-navy-dark lg:hidden">
      <Container className="py-2">
        <ul className="divide-y divide-white/10">
          {mainNav.map((item) => {
            const children = 'children' in item ? item.children : undefined
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            return (
              <li key={item.href} className="py-1">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    'block py-3 text-sm font-medium',
                    active ? 'text-green' : 'text-white',
                  )}
                >
                  {item.label}
                </Link>
                {children ? (
                  <ul className="mb-2 space-y-1 border-l border-white/15 pl-4">
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onNavigate}
                          className="block py-2 text-sm text-white/75 hover:text-green"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </Container>
    </div>
  )
}
