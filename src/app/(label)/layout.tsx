import type { Metadata, Viewport } from 'next'
import { Sora, Syne } from 'next/font/google'
import type { ReactNode } from 'react'

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'Ghost Note — Record Label',
  description:
    'Design concept for a record-label landing page: a portal hero, a throwable release deck, roster and dates.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#0A0C0E',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Separate root layout: this route is a standalone design concept, unrelated
 * to the Shri Lakhdatar Industries site in (frontend), so it renders its own
 * <html>/<body> instead of inheriting that site's CMS-driven header/footer.
 */
export default function LabelLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  )
}
