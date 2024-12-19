/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./compoents/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          xs: "375px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1270px",
          "2x1": "1170px"
        },
      },
      colors: {
        background: "var(--background)",
        primary: "#ffbe33",
        secondary: "#222831",
        success: "#00ff00",
      },
      fontFamily: {
        dancing: "red"
      }
    },
  },
  plugins: [],
};
