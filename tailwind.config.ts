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
    keyframes: {
      'expanding-circle': {
        '0%': {
          width: '0px',
          height: '0px',
          borderRadius: '100%',
          opacity: '0',
        },
        '50%': {
          borderRadius: '100%',
          opacity: '0',
        },
        '60%': {
          borderRadius: '100%',
          opacity: '1',
        },
        '75%': {
          borderRadius: '100%',
          opacity: '1',
        },
        '80%': {
          width: '800px',
          height: '800px',
          maxWidth: '100vw',
          maxHeight: '100vw',
          borderRadius: '100%',
          opacity: '1',
        },

        '100%': {
          width: '100%',
          height: '100%',

          borderRadius: '0%',
          opacity: '1',
        },
      },
    },
    animation: {
      'expanding-circle': 'expanding-circle 1s linear  forwards',
    },
    screens: {
      'sm-screen': '769px',
      'md-screen': '1024px',
      'lg-screen': '1280px',
      'xl-screen': '1440px',
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
          darker: 'hsl(var(--primary-darker))',
          light: 'hsl(var(--primary-light))',
          lighter: 'hsl(var(--primary-lighter))',
          focused: 'hsl(var(--primary-focused))',

          'alpha-70': 'hsl(var(--primary-alpha-70))',
          'alpha-50': 'hsl(var(--primary-alpha-50))',
          'alpha-30': 'hsl(var(--primary-alpha-30))',
          'alpha-20': 'hsl(var(--primary-alpha-20))',
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
          'alpha-30': 'hsl(var(--danger-alpha-30))',
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
          '50': 'hsl(var(--grayscale-50))',
          '100': 'hsl(var(--grayscale-100))',
          '200': 'hsl(var(--grayscale-200))',
          '300': 'hsl(var(--grayscale-300))',
          '400': 'hsl(var(--grayscale-400))',
          '500': 'hsl(var(--grayscale-500))',
          '600': 'hsl(var(--grayscale-600))',
          '700': 'hsl(var(--grayscale-700))',
          DEFAULT: 'hsl(var(--grayscale-400))',
          black: 'hsl(var(--grayscale-black))',
          white: 'hsl(var(--grayscale-white))',
          focused: 'hsl(var(--grayscale-focused))',
        },
        whiteAlpha: {
          '10': 'hsla(var(--white-alpha-10))',
          '30': 'hsla(var(--white-alpha-30))',
          '50': 'hsla(var(--white-alpha-50))',
          '70': 'hsla(var(--white-alpha-70))',
          DEFAULT: 'hsla(var(--white-alpha-70))',
        },
        blackAlpha: {
          '10': 'hsla(var(--black-alpha-10))',
          '20': 'hsla(var(--black-alpha-20))',
          '30': 'hsla(var(--black-alpha-30))',
          '50': 'hsla(var(--black-alpha-50))',
          '70': 'hsla(var(--black-alpha-70))',
          '80': 'hsla(var(--black-alpha-80))',
          DEFAULT: 'hsla(var(--black-alpha-70))',
        },
        navy: {
          '700': 'hsl(var(--navy-700))',
          DEFAULT: 'hsl(var(--navy-700))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
