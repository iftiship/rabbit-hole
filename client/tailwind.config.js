/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F4F1EA',
          300: '#EBE6DC',
          400: '#DED7C9',
          500: '#C9C0B0',
        },
        purple: {
          brand: '#5B4FE1',
          hover: '#4C3FD6',
          light: '#EEECFD',
          surface: '#F4F2FE',
        },
        charcoal: {
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          600: '#52525B',
          500: '#71717A',
          400: '#A1A1AA',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
        'soft': '0 4px 20px -2px rgba(0,0,0,0.05)',
        'soft-lg': '0 10px 30px -4px rgba(0,0,0,0.08)',
        'glow-purple': '0 0 25px rgba(91, 79, 225, 0.25)',
      }
    },
  },
  plugins: [],
}
