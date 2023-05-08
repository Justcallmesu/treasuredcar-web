/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        bebasNeue: ['Bebas Neue', 'cursive']
      },
      colors: {
        primary: "#609966",
      }
    },
  },
  plugins: [],
}

