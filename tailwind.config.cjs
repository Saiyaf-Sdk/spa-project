/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#ebf8f7',
          100: '#d8f0ee',
          200: '#b5e0dc',
          300: '#83c8c3',
          400: '#51aaa9',
          500: '#2a8f92',
          600: '#1f7376',
          700: '#1c5c61',
          800: '#1a4a4f',
          900: '#173f43'
        },
        ember: {
          500: '#d96c3a',
          600: '#be592d',
          700: '#984625'
        }
      },
      boxShadow: {
        float: '0 18px 45px -20px rgba(15, 45, 50, 0.42)'
      }
    }
  },
  plugins: []
};

