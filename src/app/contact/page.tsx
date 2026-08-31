import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CallButton } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { buildCallLink } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/data/siteSettings";

export const metadata: Metadata = {
  title: "Sampark Karein",
  description:
    "Saini Phool Bhandar se sampark karein — Near Gur Mandi, Sonipat. WhatsApp, call ya enquiry form bharein.",
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <PageHeader
        title="Sampark Karein"
        description="Rate poochhna ho ya order confirm karna — hum ek message door hain."
      >
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppButton
            number={siteSettings.whatsappNumber}
            message={siteSettings.defaultWhatsappMessages.contact}
          />
          <CallButton href={buildCallLink(siteSettings.whatsappNumber)} />
        </div>
      </PageHeader>

      <section className="section-padding bg-cream">
        <div className="container-content grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          <RevealOnScroll className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-card border border-border bg-warm-white p-6 md:p-8 shadow-card-rest">
              <h2 className="font-heading text-[22px] font-bold text-charcoal mb-5">
                Dukaan Ki Jaankari
              </h2>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} strokeWidth={1.75} className="shrink-0 mt-0.5 text-sage-dark" />
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal">Address</p>
                    <p className="font-body text-sm text-muted">{siteSettings.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={20} strokeWidth={1.75} className="shrink-0 mt-0.5 text-sage-dark" />
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal">Phone / WhatsApp</p>
                    <a
                      href={buildCallLink(siteSettings.whatsappNumber)}
                      className="font-body text-sm text-muted hover:text-blush-dark"
                    >
                      +91 {siteSettings.phoneNumber}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={20} strokeWidth={1.75} className="shrink-0 mt-0.5 text-sage-dark" />
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal">Shop Hours</p>
                    <p className="font-body text-sm text-muted">{siteSettings.shopHours}</p>
                  </div>
                </li>
              </ul>
            </div>
            <MapEmbed address={siteSettings.address} />
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.1}
            className="lg:col-span-3 rounded-card border border-border bg-warm-white p-6 md:p-10 shadow-card-rest"
          >
            <h2 className="font-heading text-[22px] font-bold text-charcoal mb-1.5">
              Enquiry Form Bharein
            </h2>
            <p className="font-body text-sm text-muted mb-6">
              Apni details bharein — hum jald hi WhatsApp ya call par sampark karenge.
            </p>
            <EnquiryForm />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
