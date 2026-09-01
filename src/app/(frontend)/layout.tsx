import type { Metadata, Viewport } from 'next'
import { Barlow, Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import { ContactStrip } from '@/components/layout/ContactStrip'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { TopBar } from '@/components/layout/TopBar'
import { serverUrl } from '@/config/env'
import { getSiteSettings, getWorkingHours } from '@/server/queries'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    metadataBase: new URL(serverUrl),
    title: {
      default: settings.defaultSeo.metaTitle ?? `${settings.companyName} — ${settings.tagline}`,
      template: `%s · ${settings.companyName}`,
    },
    description: settings.defaultSeo.metaDescription ?? settings.footerAbout,
  }
}

export const viewport: Viewport = {
  themeColor: '#1C3557',
  width: 'device-width',
  initialScale: 1,
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const [settings, hours] = await Promise.all([getSiteSettings(), getWorkingHours()])

  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <header>
          <TopBar settings={settings} hours={hours} />
          <ContactStrip settings={settings} />
          <Navbar />
        </header>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer settings={settings} hours={hours} />
      </body>
    </html>
  )
}
