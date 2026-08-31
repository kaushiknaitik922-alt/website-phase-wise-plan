import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SiteSettings } from "@/lib/types";

export function TrustStrip({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <section className="border-y border-border bg-warm-white">
      <div className="container-content py-8 md:py-10">
        <RevealOnScroll className="flex flex-col md:flex-row items-center gap-5 md:gap-8 text-center md:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
            <Users size={28} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-[20px] md:text-[24px] font-bold text-charcoal">
              {siteSettings.tagline}
            </h2>
            <p className="font-body text-sm md:text-base text-muted mt-1">
              Harivansh Saini se Sunil Saini, aur ab Ayush &amp; Anant Saini
              tak — wahi imaandaari, wahi taazgi.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-blush-dark hover:text-blush shrink-0"
          >
            Poori Kahani Padhein
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
