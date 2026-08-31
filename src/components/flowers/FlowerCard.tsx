import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { flowerWhatsAppMessage } from "@/lib/whatsapp";
import type { Flower, SiteSettings } from "@/lib/types";

const UNIT_LABEL: Record<Flower["unit"], string> = {
  "per piece": "/ piece",
  "per bunch": "/ bunch",
  "per kg": "/ kg",
  "per dozen": "/ dozen",
};

export function FlowerCard({
  flower,
  siteSettings,
}: {
  flower: Flower;
  siteSettings: SiteSettings;
}) {
  return (
    <div className="group h-full overflow-hidden rounded-card border border-border bg-warm-white shadow-card-rest transition-all duration-300 ease-breeze hover:-translate-y-1.5 hover:shadow-card-hover flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-card-img">
        <ImageWithFallback
          src={flower.image}
          alt={flower.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.06]"
        />
        {flower.isSeasonal && (
          <Badge tone="sage" className="absolute top-3 left-3">
            Seasonal
          </Badge>
        )}
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3 className="font-heading text-[17px] md:text-[18px] font-semibold text-charcoal mb-1 text-balance">
          {flower.name}
        </h3>
        {flower.description && (
          <p className="font-body text-xs md:text-sm text-muted mb-2 flex-1">
            {flower.description}
          </p>
        )}
        <p className="font-body text-base font-bold text-blush-dark mb-3">
          ₹{flower.rate.toLocaleString("en-IN")}{" "}
          <span className="text-xs font-medium text-muted">{UNIT_LABEL[flower.unit]}</span>
        </p>
        <WhatsAppButton
          number={siteSettings.whatsappNumber}
          message={flowerWhatsAppMessage(flower.name)}
          size="sm"
          label="Rate Poochho"
          className="w-full"
        />
      </div>
    </div>
  );
}
