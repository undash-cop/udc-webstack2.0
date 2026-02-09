/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          550: '#2d6ef0',
          600: '#2563eb',
          650: '#1e5ae6',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        emerald: {
          600: '#059669',
          650: '#047857',
          700: '#047857',
        },
        amber: {
          500: '#f59e0b',
          550: '#d97706',
          600: '#d97706',
        },
        red: {
          600: '#dc2626',
          650: '#b91c1c',
          700: '#b91c1c',
        },
        blue: {
          600: '#2563eb',
          650: '#1d4ed8',
          700: '#1d4ed8',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          150: '#ededed',
          200: '#e5e5e5',
          250: '#d9d9d9',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        red: {
          100: '#fee2e2',
          150: '#fecaca',
          200: '#fecaca',
          600: '#dc2626',
          650: '#b91c1c',
          700: '#b91c1c',
        },
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '65ch',
        'wide': '80ch',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.04)',
        'soft-lg': '0 4px 20px rgba(0,0,0,0.06)',
        'subtle': '0 1px 3px rgba(0,0,0,0.04)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
