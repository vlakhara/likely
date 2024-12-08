/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Kumbh Sans"', "sans-serif"],
      },
      boxShadow: {
        upper: "0px -2px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
