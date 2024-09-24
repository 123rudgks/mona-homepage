import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      '3xl': '1440px',
      '4xl': '1920px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary-dark))',
          light: 'hsl(var(--primary-light))',
          lighter: 'hsl(var(--primary-lighter))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          dark: 'hsl(var(--accent-dark))',
          light: 'hsl(var(--accent-light))',
          lighter: 'hsl(var(--accent-lighter))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          dark: 'hsl(var(--danger-dark))',
          light: 'hsl(var(--danger-light))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          dark: 'hsl(var(--warning-dark))',
          light: 'hsl(var(--warning-light))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          dark: 'hsl(var(--success-dark))',
          light: 'hsl(var(--success-light))',
        },
        grayscale: {
          DEFAULT: 'hsl(var(--grayscale-400))',
          black: 'hsl(var(--grayscale-black))',
          white: 'hsl(var(--grayscale-white))',
          700: 'hsl(var(--grayscale-700))',
          600: 'hsl(var(--grayscale-600))',
          500: 'hsl(var(--grayscale-500))',
          400: 'hsl(var(--grayscale-400))',
          300: 'hsl(var(--grayscale-300))',
          200: 'hsl(var(--grayscale-200))',
          100: 'hsl(var(--grayscale-100))',
          50: 'hsl(var(--grayscale-50))',
        },
        whiteAlpha: {
          DEFAULT: 'hsla(var(--white-alpha-70))',
          70: 'hsla(var(--white-alpha-70))',
          50: 'hsla(var(--white-alpha-50))',
          30: 'hsla(var(--white-alpha-30))',
          10: 'hsla(var(--white-alpha-10))',
        },
        blackAlpha: {
          DEFAULT: 'hsla(var(--black-alpha-70))',
          80: 'hsla(var(--black-alpha-80))',
          70: 'hsla(var(--black-alpha-70))',
          50: 'hsla(var(--black-alpha-50))',
          30: 'hsla(var(--black-alpha-30))',
          20: 'hsla(var(--black-alpha-20))',
          10: 'hsla(var(--black-alpha-10))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
