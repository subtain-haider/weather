/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    screens: {
      xs: { min: "0px", max: "640px" },
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
};
