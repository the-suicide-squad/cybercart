/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / 1)',
        fg: 'rgb(var(--fg) / 1)',
        border: 'rgb(var(--border) / 1)',
        brand: 'rgb(var(--brand) / 1)',
        dim: 'rgb(var(--dim) / 1)',
      }
    },
  },
  plugins: [],
}

