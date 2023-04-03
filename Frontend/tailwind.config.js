/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Epilogue", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#1DC071",
          200: "#4ACD8D",
          300: "#77D9AA",
          400: "#A5E6C6",
          500: "#D2F2E3",
          600: "#F1FBF7",
        },
        seconday: {
          100: "#6F49FD",
          200: "#8C6DFD",
          300: "#A992FE",
          400: "#C5B6FE",
          500: "#E2DBFF",
        },
        darkModes: {
          100: "#13131A",
          200: "#1C1C24",
          300: "#22222C",
          400: "#24242C",
          500: "#3A3A43",
          600: "#422C32",
        },
        neutral: {
          100: "#171725",
          200: "#4B5264",
          300: "#808191",
          400: "#A2A2A8",
          500: "#B2B3BD",
        },
        whitish: {
          100: "#FFFFFF",
          200: "#FCFBFF",
          300: "#FCFCFC",
          400: "#F1F1F3",
          500: "#FCFCFD",
        },
        erro: "#EB5757",
      },
    },
  },
  plugins: [],
};
