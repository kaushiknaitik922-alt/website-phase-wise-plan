'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { mainNav } from '@/config/site'
import { cn } from '@/lib/utils'

import { MobileMenu } from './MobileMenu'

type NavItem = (typeof mainNav)[number]

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href)

export function Navbar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Close the dropdown on route change, outside click or Escape.
  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenDropdown(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-navy text-white shadow-sm" aria-label="Main">
      <Container className="flex items-center justify-between">
        <div ref={navRef} className="hidden items-center lg:flex">
          {mainNav.map((item: NavItem) => {
            const children = 'children' in item ? item.children : undefined
            const active = isActive(pathname, item.href)

            if (!children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative px-5 py-4 text-sm font-medium tracking-wide transition-colors hover:bg-navy-light',
                    active && 'bg-navy-light',
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-green" />
                  ) : null}
                </Link>
              )
            }

            const open = openDropdown === item.href

            return (
              <div key={item.href} className="relative">
                <div className="flex items-stretch">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative py-4 pl-5 pr-1 text-sm font-medium tracking-wide transition-colors hover:bg-navy-light',
                      active && 'bg-navy-light',
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-green" />
                    ) : null}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-label={`${item.label} menu`}
                    onClick={() => setOpenDropdown(open ? null : item.href)}
                    className={cn(
                      'px-2 transition-colors hover:bg-navy-light',
                      active && 'bg-navy-light',
                    )}
                  >
                    <Icon
                      name="chevron-down"
                      className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
                    />
                  </button>
                </div>

                {open ? (
                  <ul className="absolute left-0 top-full z-50 w-72 overflow-hidden rounded-b-md border-t-2 border-green bg-white py-1 shadow-raised">
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-5 py-3 text-sm text-navy transition-colors hover:bg-surface hover:text-green-dark"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className="flex items-center gap-2 py-4 text-sm font-medium lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} className="h-5 w-5" />
          Menu
        </button>

        <Link
          href="/contact"
          className="hidden py-4 text-sm font-semibold text-green transition-colors hover:text-white lg:block"
        >
          Enquire now
        </Link>
      </Container>

      <MobileMenu open={mobileOpen} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
    </nav>
  )
}
