/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Popins: ["'Poppins'", "sans-serif"],
      },
      colors: {
        primary: "#FF800F",
        headerBg: "#f7f7fe",
        sideNavBg: "#2A2D3E",
        tableBg: "white",
        tableHeaderBg: "#f1f5f9",
        cardBg: "#FAFAFA",

        // E-commerce colors
        ePrimary: "#4f46e5",
      },
      boxShadow: {
        custom:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        custom2:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      screens: {
        xxs: "375px",
        xs: "425px",
        sm: "576px",

        md: "769px",

        lg: "992px",

        xl: "1200px",

        "2xl": "1400px",
        "3xl": "1900px",
      },
      fontSize: {
        xxs: ".35rem",
      },
    },
  },
  plugins: [],
};
