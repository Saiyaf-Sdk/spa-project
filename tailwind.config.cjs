/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        brand: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#f9f4e8',
          200: '#f0e5c8',
          300: '#e4d1a0',
          400: '#d5bc78',
          500: '#c5a059', // Core Maison Champagne Gold
          600: '#b0883e',
          700: '#8c6929',
          800: '#684c1c',
          900: '#473211'
        },
        caviar: {
          50: '#2c2c34',
          100: '#222228',
          200: '#1a1a1f',
          300: '#141417',
          400: '#0e0e11',
          500: '#09090b',
          900: '#050507'
        },
        alabaster: {
          50: '#ffffff',
          100: '#faf8f5',
          200: '#f4efe6',
          300: '#ece3d2',
          400: '#dfd4be',
          500: '#cfc0a5'
        },
        brand: {
          50: '#fdfbf7',
          100: '#f9f4e8',
          200: '#f0e5c8',
          300: '#e4d1a0',
          400: '#d5bc78',
          500: '#c5a059',
          600: '#b0883e',
          700: '#8c6929',
          800: '#684c1c',
          900: '#473211'
        },
        ember: {
          500: '#c5a059',
          600: '#b0883e',
          700: '#8c6929'
        }
      },
      boxShadow: {
        float: '0 20px 45px -15px rgba(0, 0, 0, 0.08), 0 0 20px rgba(197, 160, 89, 0.06)',
        luxury: '0 20px 45px -15px rgba(0, 0, 0, 0.1), 0 0 20px rgba(197, 160, 89, 0.1)',
        'luxury-gold': '0 12px 35px -10px rgba(197, 160, 89, 0.4)',
        'luxury-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(197, 160, 89, 0.12)'
      }
    }
  },
  plugins: []
};

