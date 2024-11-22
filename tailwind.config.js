/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F94144', // Soft Red
        secondary: '#F9F6F7', // Off-White
        accent: '#F9C74F', // Straw Hat Yellow
        textPrimary: '#2D2D2D', // Deep Charcoal Black for text
        borderLight: '#FEC5C5', // Light Red for borders and dividers
        gradientFrom: '#FFF7F7', // Subtle background gradient start
        gradientTo: '#FFDADA', // Subtle background gradient end
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-in': 'float-in 0.3s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'pulse-glow': 'pulse-glow 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 10px rgba(249, 196, 79, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(249, 196, 79, 0.8)' },
          '100%': { boxShadow: '0 0 10px rgba(249, 196, 79, 0.4)' },
        },
      },
      boxShadow: {
        yellowGlow: '0px 4px 10px rgba(249, 196, 79, 0.6)', // Glow effect for yellow elements
      },
      borderRadius: {
        xl: '16px', // Smooth rounded corners for modern look
      },
    },
  },
  plugins: [],
};