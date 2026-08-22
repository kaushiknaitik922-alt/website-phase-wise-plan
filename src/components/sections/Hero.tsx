import Image from 'next/image'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import type { Hero as HeroContent } from '@/types/content'

/**
 * Static hero banner. A slider can replace this once real factory photographs
 * are available; until then the layout does not depend on imagery.
 */
export function Hero({ hero, className }: { hero: HeroContent; className?: string }) {
  const hasImage = Boolean(hero.image?.url)

  return (
    <section className={cn('relative isolate overflow-hidden bg-navy text-white', className)}>
      {hasImage ? (
        <>
          <Image
            src={hero.image!.url}
            alt={hero.image!.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,139,44,0.28),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.10),transparent_45%)]"
        />
      )}

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          {hero.kicker ? (
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <Icon name="pin" className="h-3.5 w-3.5 text-green" />
              {hero.kicker}
            </p>
          ) : null}

          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
            {hero.heading}
          </h1>

          {hero.subheading ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {hero.subheading}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {hero.primaryCtaLabel && hero.primaryCtaHref ? (
              <ButtonLink href={hero.primaryCtaHref} size="lg">
                {hero.primaryCtaLabel}
                <Icon name="arrow-right" className="h-4 w-4" />
              </ButtonLink>
            ) : null}
            {hero.secondaryCtaLabel && hero.secondaryCtaHref ? (
              <ButtonLink href={hero.secondaryCtaHref} variant="outline" size="lg">
                {hero.secondaryCtaLabel}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
