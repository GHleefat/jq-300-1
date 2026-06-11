/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#FFF4EC',
          100: '#FFE4D1',
          200: '#FFC9A8',
          300: '#FFB088',
          400: '#FF8B5A',
          500: '#FF6B35',
          600: '#E85420',
          700: '#C13E12',
          800: '#92300E',
          900: '#6B240A',
        },
        success: '#2D6A4F',
        danger: '#C1121F',
        seafood: '#4ECDC4',
        meat: '#E63946',
        staple: '#F4A261',
        dessert: '#F72585',
        drink: '#4895EF',
        vegetable: '#80B918',
      },
      fontFamily: {
        display: ['"ZCOOL KuaiLe"', 'system-ui', 'sans-serif'],
        body: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'pop-in': 'popIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'confetti': 'confetti 1s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '80%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100px) rotate(720deg)', opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
};
