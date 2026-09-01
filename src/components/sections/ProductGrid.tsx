import { ProductCard } from '@/components/product/ProductCard'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { ProductView } from '@/types/content'

export function ProductGrid({
  kicker,
  heading,
  intro,
  products,
}: {
  kicker?: string
  heading: string
  intro?: string
  products: ProductView[]
}) {
  if (products.length === 0) return null

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading kicker={kicker} heading={heading} intro={intro} align="center" />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
