import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import type { Hero } from '@/types/content'

/** Compact hero used at the top of inner pages, with a breadcrumb. */
export function PageHero({
  hero,
  breadcrumb,
}: {
  hero: Hero
  breadcrumb: { label: string; href?: string }[]
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {hero.image?.url ? (
        <>
          <Image
            src={hero.image.url}
            alt={hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/85" />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(74,139,44,0.25),transparent_50%)]"
        />
      )}

      <Container className="relative py-12 lg:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            {breadcrumb.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-green">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {hero.kicker ? (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-green">
            {hero.kicker}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {hero.heading}
        </h1>
        {hero.subheading ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {hero.subheading}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
