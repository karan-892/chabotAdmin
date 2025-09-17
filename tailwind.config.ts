import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // ---- merged palette ----
        background: 'hsl(220, 15%, 16%)',
        foreground: 'hsl(0, 0%, 95%)',
        card: {
          DEFAULT: 'hsl(220, 15%, 20%)',
          foreground: 'hsl(0, 0%, 95%)',
        },
        popover: {
          DEFAULT: 'hsl(220, 15%, 22%)',
          foreground: 'hsl(0, 0%, 95%)',
        },
        primary: {
          DEFAULT: 'hsla(212, 87%, 3%, 1)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(220, 15%, 30%)',
          foreground: 'hsl(0, 0%, 95%)',
        },
        muted: {
          DEFAULT: 'hsl(220, 15%, 25%)',
          foreground: 'hsl(220, 10%, 65%)',
        },
        accent: {
          DEFAULT: 'hsla(211, 84%, 5%, 1)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84%, 45%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        border: 'hsl(220, 15%, 30%)',
        input: 'hsl(220, 15%, 25%)',
        ring: 'hsla(208, 81%, 4%, 1)',
        chart: {
          1: 'hsl(210, 100%, 45%)',
          2: 'hsl(220, 70%, 50%)',
          3: 'hsl(280, 65%, 60%)',
          4: 'hsl(160, 60%, 45%)',
          5: 'hsl(30, 80%, 55%)',
        },
        // ✅ keep extra custom color here too
        'electric-blue': '#0ea5e9',
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
};

export default config;
