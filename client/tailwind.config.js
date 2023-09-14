/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: "white",
      //   secondary: "#f1debc",
      //   sec_dark: "#dcb571",
      // },
      colors: {
        primary: "#ffffff",
        secondary: "#e5e5e5",
        sec_dark: "#102542",
        white: "#fff",
        black: "#000",
        gray: {
          100: "#f7fafc",
          // ...
          900: "#1a202c",
        },
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
});