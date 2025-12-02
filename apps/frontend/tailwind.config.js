const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#0a2540',
          foreground: '#f6f9fc',
          50: '#f0f6ff',
          100: '#d9e8ff',
          200: '#b3d0ff',
          300: '#80b0ff',
          400: '#4c8fff',
          500: '#1f6fff',
          600: '#0a4dcf',
          700: '#083b9f',
          800: '#072d79',
          900: '#051f52',
        },
        accent: {
          DEFAULT: '#4a6dfb',
          500: '#4a6dfb',
          600: '#3d5ad8',
        },
        muted: '#64748b',
        border: '#e2e8f0',
        input: '#cbd5f5',
        ring: '#4a6dfb',
        card: '#ffffff',
        'card-foreground': '#0a2540',
        'muted-foreground': '#475569',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      boxShadow: {
        brand: '0 20px 45px -20px rgba(11, 37, 64, 0.35)',
        soft: '0 10px 30px -15px rgba(15, 23, 42, 0.25)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0a2540 0%, #4a6dfb 100%)',
        'accent-gradient': 'linear-gradient(135deg, #1f6fff 0%, #4a6dfb 100%)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      keyframes: {
        'card-hover': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 rgba(15, 23, 42, 0)' },
          '100%': { transform: 'scale(1.01)', boxShadow: '0 20px 35px -25px rgba(15, 23, 42, 0.35)' },
        },
        'accordion-down': {
          from: { height: '0px', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0px', opacity: '0' },
        },
      },
      animation: {
        'card-hover': 'card-hover 180ms ease-out forwards',
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-in',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
