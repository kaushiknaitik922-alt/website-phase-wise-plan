"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Flower2 } from "lucide-react";
import { NAV_LINKS } from "@/components/layout/NAV_LINKS";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildCallLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function Header({ siteSettings }: { siteSettings: SiteSettings }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-warm-white border-b border-border">
      <div className="container-content flex h-16 md:h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label={`${siteSettings.businessName} — Home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-tint text-blush-dark">
            <Flower2 size={20} strokeWidth={1.75} />
          </span>
          <span className="font-heading text-lg md:text-xl font-bold leading-tight text-charcoal">
            {siteSettings.businessName}
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-body text-[15px] font-medium py-1 transition-colors duration-200",
                  active ? "text-blush-dark" : "text-charcoal hover:text-blush-dark"
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-blush-dark" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={buildCallLink(siteSettings.whatsappNumber)}
            className="flex items-center gap-1.5 font-body text-sm font-medium text-charcoal hover:text-blush-dark transition-colors"
          >
            <Phone size={16} strokeWidth={1.75} />
            <span>{formatPhone(siteSettings.phoneNumber)}</span>
          </a>
          <WhatsAppButton
            number={siteSettings.whatsappNumber}
            message={siteSettings.defaultWhatsappMessages.home}
            size="icon"
          />
        </div>

        <button
          type="button"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-charcoal"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-warm-white"
          >
            <nav
              className="container-content flex flex-col gap-1 py-4"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-3 py-3 font-body text-base font-medium transition-colors",
                      active
                        ? "bg-blush-tint text-blush-dark"
                        : "text-charcoal hover:bg-cream"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-3 mt-3 px-3">
                <a
                  href={buildCallLink(siteSettings.whatsappNumber)}
                  className="flex items-center gap-1.5 font-body text-sm font-medium text-charcoal"
                >
                  <Phone size={16} strokeWidth={1.75} />
                  {formatPhone(siteSettings.phoneNumber)}
                </a>
                <WhatsAppButton
                  number={siteSettings.whatsappNumber}
                  message={siteSettings.defaultWhatsappMessages.home}
                  size="sm"
                  label="WhatsApp"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function formatPhone(phone: string) {
  if (phone.length !== 10) return phone;
  return `${phone.slice(0, 5)} ${phone.slice(5)}`;
}
