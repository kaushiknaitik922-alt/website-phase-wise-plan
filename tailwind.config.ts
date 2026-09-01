import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: 'rgb(var(--brand-navy) / <alpha-value>)',
          light: 'rgb(var(--brand-navy-light) / <alpha-value>)',
          dark: 'rgb(var(--brand-navy-dark) / <alpha-value>)',
        },
        green: {
          DEFAULT: 'rgb(var(--brand-green) / <alpha-value>)',
          dark: 'rgb(var(--brand-green-dark) / <alpha-value>)',
        },
        ink: 'rgb(var(--brand-ink) / <alpha-value>)',
        muted: 'rgb(var(--brand-muted) / <alpha-value>)',
        surface: 'rgb(var(--brand-surface) / <alpha-value>)',
        line: 'rgb(var(--brand-line) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      maxWidth: { prose: '68ch' },
      boxShadow: {
        card: '0 1px 2px rgb(16 24 40 / 0.04), 0 8px 24px rgb(16 24 40 / 0.06)',
        raised: '0 12px 32px rgb(16 24 40 / 0.10)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: { 'fade-up': 'fade-up .5s ease-out both' },
    },
  },
  plugins: [],
}

export default config
