/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js"],
  theme: {
    extend: {
      colors: {
        cream: '#fdfbf7',
        darkChocolate: '#2a1810',
        sweetPink: '#f2a1b5',
        deepBurgundy: '#660f24', // Burdeo intenso
        neonBurgundy: '#ff2a5f', // Rojo neón para efectos futuristas
        softGray: '#f3f4f6'
      },
      fontFamily: {
        brand: ['"Playfair Display"', 'serif'], // Letras elegantes
        sans: ['"Outfit"', 'sans-serif'] // Letras modernas
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 42, 95, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
      }
    },
  },
  plugins: [],
}