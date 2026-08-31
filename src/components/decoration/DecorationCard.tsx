import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { decorationWhatsAppMessage } from "@/lib/whatsapp";
import type { DecorationService, SiteSettings } from "@/lib/types";

export function DecorationCard({
  service,
  siteSettings,
  galleryHref,
}: {
  service: DecorationService;
  siteSettings: SiteSettings;
  galleryHref: string;
}) {
  return (
    <div className="group h-full overflow-hidden rounded-card border border-border bg-warm-white shadow-card-rest transition-all duration-300 ease-breeze hover:-translate-y-1.5 hover:shadow-card-hover flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-card-img">
        <ImageWithFallback
          src={service.images[0]}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-heading text-[18px] md:text-[20px] font-semibold text-charcoal mb-1.5 text-balance">
          {service.title}
        </h3>
        <p className="font-body text-sm text-muted mb-3 flex-1">{service.description}</p>
        <p className="font-body text-base font-bold text-blush-dark mb-4">
          Starting from ₹{service.startingRate.toLocaleString("en-IN")}
        </p>
        <div className="flex flex-col gap-2.5">
          <WhatsAppButton
            number={siteSettings.whatsappNumber}
            message={
              service.whatsappMessageOverride ??
              decorationWhatsAppMessage(service.category)
            }
            size="sm"
            className="w-full"
          />
          <Link
            href={galleryHref}
            className="text-center font-body text-xs font-medium text-muted hover:text-blush-dark underline underline-offset-4"
          >
            Gallery mein aur photos dekhein →
          </Link>
        </div>
      </div>
    </div>
  );
}
