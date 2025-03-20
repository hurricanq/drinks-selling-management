/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "outfit": "Outfit",
      },
      colors: {
        "primary-text": "#4e342e",
        "primary-bg": "#d7ccc8"
      }
    },
  },
  plugins: [],
})

