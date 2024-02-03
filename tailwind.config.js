/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Bokk-Gothic": ['"Bokk-Gothic"', ...defaultTheme.fontFamily.sans],
        "Bokk-MeongJo": ['"Bokk-MeongJo"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
