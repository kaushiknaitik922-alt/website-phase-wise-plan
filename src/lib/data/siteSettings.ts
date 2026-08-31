import { IMAGES } from "@/lib/images";
import type { SiteSettings } from "@/lib/types";

/**
 * Local stand-in for Payload's `siteSettings` global (WEBSITE_ARCHITECTURE.md §3).
 * Async + Promise-returning on purpose so callers already look like they're
 * awaiting a Payload local-API/REST call — swapping the body for a real
 * `payload.findGlobal({ slug: 'siteSettings' })` later is a one-file change.
 */
const siteSettings: SiteSettings = {
  businessName: "Saini Phool Bhandar",
  tagline: "Teen Peedhiyon Se Sonipat Ka Bharosemand Naam",
  phoneNumber: "9306844938",
  whatsappNumber: "919306844938",
  address: "Near Gur Mandi, Sonipat, Haryana",
  shopHours: "9:00 AM – 9:00 PM, all days",
  heroImage: IMAGES.heroBouquet,
  heroHeadline: "Har Avsar Ke Liye, Taaze Phool Aur Khoobsurat Decoration",
  heroSubline:
    "Bouquets, loose flowers aur event decoration — Sonipat mein teen peedhiyon se bharose ke saath.",
  establishedNote: "3rd generation business, Sonipat",
  defaultWhatsappMessages: {
    home: "Hi, mujhe phool chahiye.",
    flowerGeneric: "Hi, mujhe flowers ke baare me jaankari chahiye.",
    carDecoration: "Hi, car decoration ke baare me jaanna hai.",
    haldiDecoration: "Hi, haldi rasam decoration ke baare me jaanna hai.",
    roomDecoration: "Hi, room decoration ke baare me jaanna hai.",
    galleryGeneric: "Hi, mujhe yeh decoration chahiye.",
    bulkOrder:
      "Hi, mujhe bulk order/custom bouquet ke baare me baat karni hai.",
    contact: "Hi, mujhe phool/decoration ke baare me baat karni hai.",
  },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}
