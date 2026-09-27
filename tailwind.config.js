/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        },
        accent: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          900: '#831843'
        },
        ink: {
          DEFAULT: '#0b0616',
          soft: '#1a0f2e',
          muted: '#2d1b4e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(88,28,135,0.25)',
        lift: '0 24px 50px -20px rgba(88,28,135,0.35)',
        glow: '0 0 40px -8px rgba(236,72,153,0.5)'
      }
    }
  },
  plugins: []
};