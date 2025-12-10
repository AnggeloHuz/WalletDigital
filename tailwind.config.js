/** @type {import('tailwindcss').Config} */
module.exports = {
  // Aquí le decimos que busque en App.js y en TODA la carpeta src
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
