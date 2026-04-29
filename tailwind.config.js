/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#080B1A',
          50: '#1A1F3D',
          100: '#151A35',
          200: '#10142D',
          300: '#0C0F24',
          400: '#080B1A',
          500: '#050711',
          600: '#030409',
          700: '#010103',
          800: '#000000',
          900: '#000000',
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
          800: '#7E6312',
          900: '#614C08',
        },
        saffron: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FF9933',
          500: '#E8852A',
          600: '#D4721E',
          700: '#BF5F12',
          800: '#AA4C08',
          900: '#8B3A00',
        },
        cosmic: {
          50: '#E8E0F5',
          100: '#C9B6E8',
          200: '#A98BDB',
          300: '#8A61CE',
          400: '#6B37C1',
          500: '#2D1B69',
          600: '#251658',
          700: '#1D1147',
          800: '#1A1145',
          900: '#0E0A2E',
        },
        divine: {
          DEFAULT: '#FFD700',
          glow: 'rgba(255, 215, 0, 0.4)',
          soft: 'rgba(255, 215, 0, 0.15)',
        },
        glass: {
          DEFAULT: 'rgba(15, 21, 53, 0.6)',
          light: 'rgba(15, 21, 53, 0.4)',
          heavy: 'rgba(15, 21, 53, 0.8)',
          border: 'rgba(212, 168, 67, 0.15)',
          'border-hover': 'rgba(212, 168, 67, 0.3)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel Decorative', 'Cinzel', 'serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #080B1A 0%, #1A1145 30%, #0F1535 60%, #080B1A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4A843 0%, #F5D77A 50%, #D4A843 100%)',
        'divine-gradient': 'linear-gradient(135deg, #FFD700 0%, #FF9933 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(15,21,53,0.8) 0%, rgba(45,27,105,0.4) 100%)',
      },
      boxShadow: {
        'divine': '0 0 30px rgba(255, 215, 0, 0.15)',
        'divine-lg': '0 0 60px rgba(255, 215, 0, 0.25)',
        'gold': '0 4px 30px rgba(212, 168, 67, 0.2)',
        'cosmic': '0 8px 40px rgba(45, 27, 105, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'star-twinkle': 'starTwinkle 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
