/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          100: '#7371b5',
          200: '#6866ac',
          300: '#4c497e',
          400: '#403f69',
          500: '#333154',
          600: '#222138',
          700: '#1a192b'
        }
      }
    }
  },
  plugins: []
};
