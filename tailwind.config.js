/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#09090b',
          50: '#0c0c10',
          100: '#111116',
          200: '#17171e',
          300: '#1e1e28',
          400: '#262633',
          500: '#2e2e3d',
          600: '#3a3a4e',
          700: '#52526e',
        },
        gold: {
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE699',
          300: '#FFDC73',
          400: '#F5D77A',
          500: '#D4A843',
          600: '#B8922F',
          700: '#9B7A1F',
        },
        saffron: { 400: '#FF9933', 500: '#E8852A' },
        divine: {
          blue: '#4F6BFF',
          violet: '#7C5BFF',
          indigo: '#2A1F6B',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel Decorative', 'Cinzel', 'serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-left': 'slideLeft 0.3s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        slideLeft: { '0%': { opacity: 0, transform: 'translateX(12px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 15px rgba(212,168,67,0.06)' }, '50%': { boxShadow: '0 0 25px rgba(212,168,67,0.15)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
