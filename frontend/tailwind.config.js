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
        "poppins": "Poppins"
      },
      colors: {
        "primary-text": "#6b21a8",
        "primary-bg": "#a855f7"
      }
    },
  },
  plugins: [],
})

