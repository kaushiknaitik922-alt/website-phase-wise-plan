"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/lib/types";

/** Page-aware default WhatsApp message, per PRD.md's floating button spec. */
function messageForPath(pathname: string, messages: SiteSettings["defaultWhatsappMessages"]) {
  if (pathname.startsWith("/flowers")) return messages.flowerGeneric;
  if (pathname.startsWith("/decoration")) return messages.roomDecoration;
  if (pathname.startsWith("/gallery")) return messages.galleryGeneric;
  if (pathname.startsWith("/contact")) return messages.contact;
  return messages.home;
}

export function FloatingWhatsAppButton({ siteSettings }: { siteSettings: SiteSettings }) {
  const pathname = usePathname();
  const message = messageForPath(pathname ?? "/", siteSettings.defaultWhatsappMessages);

  return (
    <motion.a
      href={buildWhatsAppLink(siteSettings.whatsappNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-btn-whatsapp"
      aria-label="WhatsApp par sampark karein"
    >
      <MessageCircle size={28} strokeWidth={1.75} />
    </motion.a>
  );
}
