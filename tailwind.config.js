/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'], // alternativa Raleway
      },
    },
  },
  plugins: [],
}

