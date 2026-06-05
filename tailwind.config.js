/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js"],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f5',
        darkChocolate: '#3d2314',
        sweetPink: '#f2a1b5',
        deepBurgundy: '#500713',
        softGray: '#f3f4f6'
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}