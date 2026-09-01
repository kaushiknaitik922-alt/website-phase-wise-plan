import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/ui/Icon'
import { ColourSwatches } from '@/components/product/ColourSwatches'
import { cn } from '@/lib/utils'
import { CARD_ASPECT, objectFitFor } from '@/server/product-photos'
import type { ProductView } from '@/types/content'

export function ProductCard({ product }: { product: ProductView }) {
  const href = `/products/${product.slug}`

  return (
    <li className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition-shadow duration-200 hover:shadow-raised">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-surface">
        {product.heroImage ? (
          <Image
            src={product.heroImage.url}
            alt={product.heroImage.alt || product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              'transition-transform duration-300 group-hover:scale-[1.03]',
              objectFitFor(product.heroImage, CARD_ASPECT) === 'contain'
                ? 'object-contain p-3'
                : 'object-cover',
            )}
          />
        ) : (
          // No photographs yet — the colour range stands in for the product image.
          <span className="flex h-full w-full flex-wrap content-center items-center justify-center gap-2 bg-navy/5 p-6">
            {product.colours.slice(0, 6).map((colour) => (
              <span
                key={colour.name}
                title={colour.name}
                aria-hidden="true"
                className="h-9 w-9 rounded-full border border-white/70 shadow-sm"
                style={{ backgroundColor: colour.hexCode }}
              />
            ))}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-navy">
          <Link href={href} className="transition-colors hover:text-green-dark">
            {product.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.shortDescription}</p>

        {product.colours.length > 0 ? (
          <ColourSwatches colours={product.colours.slice(0, 4)} size="sm" className="mt-4" />
        ) : null}

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-dark transition-colors hover:text-navy"
        >
          View Details
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </li>
  )
}
