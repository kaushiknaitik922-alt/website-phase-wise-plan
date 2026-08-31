import type { Metadata } from "next";
import { Playfair_Display, Poppins, Noto_Sans_Devanagari } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsAppButton } from "@/components/layout/FloatingWhatsAppButton";
import { PageTransition } from "@/components/layout/PageTransition";
import { getSiteSettings } from "@/lib/data/siteSettings";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sainiphoolbhandar.example.com"),
  title: {
    default: "Saini Phool Bhandar — Flowers & Decoration in Sonipat",
    template: "%s | Saini Phool Bhandar",
  },
  description:
    "Saini Phool Bhandar — near Gur Mandi, Sonipat. Fresh flowers, bouquets aur car/haldi/room decoration, teen peedhiyon se bharose ke saath. Rates dekhein, WhatsApp ya call karke order karein.",
  keywords: [
    "flower shop Sonipat",
    "phool wale Gur Mandi Sonipat",
    "car decoration Sonipat",
    "haldi decoration Sonipat",
    "room decoration Sonipat",
    "bouquet Sonipat",
    "Saini Phool Bhandar",
  ],
  openGraph: {
    title: "Saini Phool Bhandar — Flowers & Decoration in Sonipat",
    description:
      "Teen peedhiyon se Sonipat ka bharosemand naam — fresh flowers, bouquets aur event decoration.",
    siteName: "Saini Phool Bhandar",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${notoDevanagari.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-blush focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header siteSettings={siteSettings} />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer siteSettings={siteSettings} />
        <FloatingWhatsAppButton siteSettings={siteSettings} />
      </body>
    </html>
  );
}
