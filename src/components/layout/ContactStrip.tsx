import Image from 'next/image'
import Link from 'next/link'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { cn, formatPhone, telHref } from '@/lib/utils'
import type { SiteSettingsView } from '@/types/content'

/** Logo, three contact blocks and the quote button. */
export function ContactStrip({ settings }: { settings: SiteSettingsView }) {
  const blocks = [
    settings.email
      ? { icon: 'mail' as const, label: 'Email us', value: settings.email, href: `mailto:${settings.email}` }
      : null,
    {
      icon: 'phone' as const,
      label: 'Call us',
      value: formatPhone(settings.phonePrimary),
      href: telHref(settings.phonePrimary),
    },
    {
      icon: 'pin' as const,
      label: 'Factory',
      value: settings.addressLines.join(', '),
      href: '/contact',
    },
  ].filter(Boolean) as { icon: 'mail' | 'phone' | 'pin'; label: string; value: string; href: string }[]

  return (
    <Container className="flex flex-col gap-6 py-5 lg:flex-row lg:items-center lg:justify-between">
      <Link href="/" className="flex items-center gap-3">
        {settings.logo ? (
          <Image
            src={settings.logo.url}
            alt={settings.logo.alt || settings.companyName}
            width={56}
            height={56}
            className="h-12 w-auto object-contain"
            priority
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-md bg-navy font-display text-lg font-bold text-white"
          >
            SL
          </span>
        )}
        <span className="leading-tight">
          <span className="block font-display text-lg font-bold tracking-tight text-navy sm:text-xl">
            {settings.companyName}
          </span>
          <span className="block text-xs text-muted">{settings.tagline}</span>
        </span>
      </Link>

      <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center lg:gap-8">
        {blocks.map((block) => (
          <a
            key={block.label}
            href={block.href}
            className={cn(
              'group flex items-start gap-3',
              // On phones the header is already tall; the address is a tap away
              // in the footer and on the contact page.
              block.icon === 'pin' && 'hidden sm:flex',
            )}
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-navy transition-colors group-hover:bg-navy group-hover:text-white">
              <Icon name={block.icon} className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs uppercase tracking-wider text-muted">{block.label}</span>
              <span className="block max-w-[16rem] text-sm font-medium text-navy">{block.value}</span>
            </span>
          </a>
        ))}
        <ButtonLink href="/contact" size="md" className="w-full sm:w-auto">
          Get a Quote
        </ButtonLink>
      </div>
    </Container>
  )
}
