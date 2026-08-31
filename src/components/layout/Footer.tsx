import Link from "next/link";
import { Phone, MapPin, Clock, Flower2 } from "lucide-react";
import { NAV_LINKS } from "@/components/layout/NAV_LINKS";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildCallLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/lib/types";

export function Footer({ siteSettings }: { siteSettings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush/20 text-blush">
                <Flower2 size={20} strokeWidth={1.75} />
              </span>
              <span className="font-heading text-xl font-bold text-warm-white">
                {siteSettings.businessName}
              </span>
            </Link>
            <p className="font-body text-sm text-cream/70 max-w-sm mb-6">
              {siteSettings.tagline} — flowers aur decoration jinpe bharosa
              kiya ja sakta hai.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppButton
                number={siteSettings.whatsappNumber}
                message={siteSettings.defaultWhatsappMessages.home}
                size="sm"
              />
              <a
                href={buildCallLink(siteSettings.whatsappNumber)}
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-cream/40 px-5 py-2 text-sm font-semibold text-cream hover:bg-cream hover:text-charcoal transition-colors"
              >
                <Phone size={16} strokeWidth={1.75} />
                Call Now
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-[0.06em] text-cream/50 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 hover:text-blush transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-[0.06em] text-cream/50 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 font-body text-sm text-cream/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-blush" />
                <span>{siteSettings.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-blush" />
                <a
                  href={buildCallLink(siteSettings.whatsappNumber)}
                  className="hover:text-blush transition-colors"
                >
                  +91 {formatPhone(siteSettings.phoneNumber)}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-blush" />
                <span>{siteSettings.shopHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/10 flex flex-col-reverse md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="font-body text-xs text-cream/50">
            © {year} {siteSettings.businessName}. All rights reserved.
          </p>
          <Link
            href="/about"
            className="font-body text-xs text-cream/60 hover:text-blush transition-colors"
          >
            {siteSettings.establishedNote} — poori kahani padhein →
          </Link>
        </div>
      </div>
    </footer>
  );
}

function formatPhone(phone: string) {
  if (phone.length !== 10) return phone;
  return `${phone.slice(0, 5)} ${phone.slice(5)}`;
}
