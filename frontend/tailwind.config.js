/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": "Poppins"
      },
      colors: {
        "primary-text": "#6b21a8",
        "primary-bg": "#a855f7"
      }
    },
  },
  plugins: [],
}

