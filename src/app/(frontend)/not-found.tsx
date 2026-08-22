import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { productCategories } from '@/config/site'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy">
        This page could not be found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
        The page may have moved. Try our products, or call us and we will point you to what you
        need.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/products">View Products</ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact Us
        </ButtonLink>
      </div>

      <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {productCategories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/products/${category.slug}`}
              className="text-navy underline-offset-4 transition-colors hover:text-green-dark hover:underline"
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
