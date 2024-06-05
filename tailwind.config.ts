import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        // input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          bg: 'hsl(var(--primary-bg))',
          fg: 'hsl(var(--primary-fg))',
        },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        danger: {
          bg: 'hsl(var(--danger-bg))',
          fg: 'hsl(var(--danger-fg))',
        },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))',
        // },
        accent: {
          bg: 'hsl(var(--accent-bg))',
          fg: 'hsl(var(--accent-fg))',
        },
        popover: {
          bg: 'hsl(var(--popover-bg))',
          fg: 'hsl(var(--popover-fg))',
        },
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
      },
      boxShadow: {
        popover: '0 5px 10px rgba(0,0,0,0.15)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
