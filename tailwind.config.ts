import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        blush: {
          DEFAULT: "#E8A0B4",
          dark: "#D6789A",
          tint: "#FBEAEF",
        },
        cream: "#FBF3EC",
        "warm-white": "#FFFFFF",
        charcoal: "#33302E",
        muted: "#6B615C",
        border: "#EADFD5",
        sage: {
          DEFAULT: "#A9C1A1",
          dark: "#7E9C76",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#1DA851",
        },
        error: "#C0554A",
        success: "#7E9C76",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-poppins)", "var(--font-devanagari)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "20px",
        "card-img": "16px",
      },
      boxShadow: {
        "card-rest": "0 2px 8px rgba(51,48,46,0.06)",
        "card-hover": "0 12px 28px rgba(51,48,46,0.12)",
        "btn-primary": "0 4px 12px rgba(232,160,180,0.35)",
        "btn-whatsapp": "0 4px 12px rgba(37,211,102,0.35)",
      },
      spacing: {
        "section-mobile": "48px",
        "section-desktop": "96px",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 550ms ease-out both",
        "fade-scale-in": "fade-scale-in 250ms ease-in-out both",
      },
      transitionTimingFunction: {
        breeze: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
