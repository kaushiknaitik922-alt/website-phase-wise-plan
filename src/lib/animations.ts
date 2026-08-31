import type { Variants } from "framer-motion";

/**
 * Shared framer-motion variants per BRAND_GUIDELINES.md §7 — Animation Rules.
 * "Motion should feel like a gentle breeze, not a bounce." No spring/bounce
 * physics; ease-out fades + slides only.
 */

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export const staggerContainer = (stagger = 0.09): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

export const fadeScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
};

/** Default viewport config for scroll-triggered reveals: once, slightly before fully in view. */
export const revealViewport = { once: true, margin: "-80px" };
