import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { productCategories } from '@/config/site'
import { formatPhone, telHref } from '@/lib/utils'
import { hoursSummary } from '@/lib/working-hours'
import { whatsappHref } from '@/lib/whatsapp'
import type { SiteSettingsView, WorkingHoursView } from '@/types/content'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Our Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
]

export function Footer({
  settings,
  hours,
}: {
  settings: SiteSettingsView
  hours: WorkingHoursView
}) {
  const numbers = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean) as string[]
  const whatsapp = settings.whatsappPrimary || settings.phonePrimary

  return (
    <footer className="mt-auto bg-navy-dark text-white/75">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            {settings.logo ? (
              <Image
                src={settings.logo.url}
                alt={settings.logo.alt || settings.companyName}
                width={48}
                height={48}
                className="h-11 w-auto object-contain"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10 font-display font-bold text-white"
              >
                SL
              </span>
            )}
            <span className="font-display text-base font-bold leading-tight text-white">
              {settings.companyName}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{settings.footerAbout}</p>
          {settings.legalName || settings.gstNumber ? (
            <p className="mt-4 text-xs text-white/50">
              {settings.legalName}
              {settings.legalName && settings.gstNumber ? ' · ' : ''}
              {settings.gstNumber ? `GST: ${settings.gstNumber}` : ''}
            </p>
          ) : null}
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-green">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
            Products
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {productCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/${category.slug}`}
                  className="transition-colors hover:text-green"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
            Contact
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="flex items-start gap-2">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-green" />
              <span>{settings.addressLines.join(', ')}</span>
            </p>
            {numbers.map((number) => (
              <p key={number} className="flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-green" />
                <a href={telHref(number)} className="transition-colors hover:text-green">
                  {formatPhone(number)}
                </a>
              </p>
            ))}
            {settings.email ? (
              <p className="flex items-center gap-2">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-green" />
                <a href={`mailto:${settings.email}`} className="transition-colors hover:text-green">
                  {settings.email}
                </a>
              </p>
            ) : null}
            <p className="flex items-center gap-2">
              <Icon name="whatsapp" className="h-4 w-4 shrink-0 text-green" />
              <a
                href={whatsappHref(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-green"
              >
                Chat on WhatsApp
              </a>
            </p>
            <p className="flex items-center gap-2 text-white/60">
              <Icon name="clock" className="h-4 w-4 shrink-0 text-green" />
              <span>{hoursSummary(hours)}</span>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
          </p>
          <p>Supplying {settings.supplyAreas.slice(0, 3).join(', ')} and other parts of North India.</p>
        </Container>
      </div>
    </footer>
  )
}
