/**
 * Single source for every wa.me link on the site, per WEBSITE_ARCHITECTURE.md
 * (`lib/whatsapp.ts — buildWhatsAppLink(number, message) helper — single
 * source for all wa.me links`).
 */

/** Build a wa.me deep link with a pre-filled, URL-encoded message. */
export function buildWhatsAppLink(number: string, message: string): string {
  const digitsOnly = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}

/** Build a tel: deep link. */
export function buildCallLink(number: string): string {
  const digitsOnly = number.replace(/[^0-9]/g, "");
  return `tel:+${digitsOnly}`;
}

/** Per-flower message: "Hi, [Flower Name] ka rate batao." */
export function flowerWhatsAppMessage(flowerName: string): string {
  return `Hi, ${flowerName} ka rate batao.`;
}

/** Per-decoration-category message templates (owner-editable via CMS in the real build). */
export function decorationWhatsAppMessage(
  category: "Car" | "Haldi" | "Room",
  titleOverride?: string
): string {
  if (titleOverride) return titleOverride;
  switch (category) {
    case "Car":
      return "Hi, car decoration ke baare me jaanna hai.";
    case "Haldi":
      return "Hi, haldi rasam decoration ke baare me jaanna hai.";
    case "Room":
      return "Hi, room decoration ke baare me jaanna hai.";
  }
}

/** Gallery lightbox message, optionally including the item's title/category. */
export function galleryWhatsAppMessage(itemTitle?: string): string {
  return itemTitle
    ? `Hi, mujhe "${itemTitle}" jaisa decoration chahiye.`
    : "Hi, mujhe yeh decoration chahiye.";
}
