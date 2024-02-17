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
      },
      boxShadow: {
        'sheet': '0 0 0 1px #30363d, 0 16px 32px rgba(1, 4, 9, 0.85)',
      },
      data: {
        highlighted: 'highlighted',
      },
    },
  },
  plugins: [],
}

