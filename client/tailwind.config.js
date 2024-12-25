/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        col1: '#b39bc8',
        col2: '#FEFFFF',
      },
    },
  },
  plugins: [],
}

