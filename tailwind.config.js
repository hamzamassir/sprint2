/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./en/**/*.{html,js}",
    "./ar/**/*.{html,js}",
    "./*.html"
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': ['"IBM Plex Sans"', 'sans-serif'], // This makes it the default font
    },
    extend: {
      // other extensions...
    },
  },
  plugins: [],
}
