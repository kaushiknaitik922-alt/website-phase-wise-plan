/**
 * Builds a wa.me link with a pre-filled message, so the buyer lands in a chat
 * that already says what they were looking at.
 */
export const whatsappHref = (number: string, message?: string): string => {
  const digits = number.replace(/\D/g, '').slice(-10)
  const base = `https://wa.me/91${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const productEnquiryMessage = (companyName: string, productTitle?: string): string =>
  productTitle
    ? `Hello ${companyName}, I would like a quote for ${productTitle}.`
    : `Hello ${companyName}, I would like to enquire about your products.`
