/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js"],
  theme: {
    extend: {
      colors: {
        cream: '#fdfbf7',
        darkChocolate: '#2a1810',
        sweetPink: '#f2a1b5',
        deepBurgundy: '#660f24',
        neonBurgundy: '#ff2a5f',
        softGray: '#f3f4f6'
      },
      fontFamily: {
        brand: ['"Poppins"', 'sans-serif'], // Letras modernas y gruesas para títulos
        sans: ['"Outfit"', 'sans-serif'] // Letras limpias para lectura
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 42, 95, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
      }
    },
  },
  plugins: [],
}