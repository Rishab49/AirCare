/** @type {import('tailwindcss').Config} */
module.exports = {
  resolve:{
    preserveSymlinks: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}