const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        brand: {
          DEFAULT: '#0B5C4B',
          foreground: '#F5FBF9',
          50: '#EAF5F2',
          100: '#CCE8DF',
          200: '#99D0BF',
          300: '#66B89F',
          400: '#33A07F',
          500: '#0B5C4B',
          600: '#084B3D',
        },
        slate: {
          DEFAULT: '#1F2933',
          foreground: '#F8FAFC',
          50: '#F3F4F6',
          100: '#E5E7EB',
          200: '#CBD5F5',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
        },
        success: { DEFAULT: '#059669', foreground: '#ECFDF5' },
        warning: { DEFAULT: '#B45309', foreground: '#FFFBEB' },
        danger: { DEFAULT: '#B91C1C', foreground: '#FEF2F2' },
        border: '#E2E8F0',
        input: '#CBD5F5',
        ring: '#0B5C4B',
        card: '#FFFFFF',
        'card-foreground': '#0B1F1A',
        'muted-foreground': '#475569',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }],
        'heading-2': ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],
        'heading-3': ['1.375rem', { lineHeight: '1.875rem' }],
        body: ['1rem', { lineHeight: '1.65rem' }],
        small: ['0.875rem', { lineHeight: '1.5rem' }],
        caption: ['0.75rem', { lineHeight: '1.3rem' }],
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
        shell: '2.5rem',
        'shell-sm': '1.5rem',
        'shell-lg': '3rem',
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
