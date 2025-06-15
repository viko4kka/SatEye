/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        whiteTextColor: "#ffffff",
        darkPurpleColor: "#122D94",
        lightPurpleColor: "#3048A2",
        greyColorSearchBar: "#76808D",
        searchBarBackgroundColor: "#20242A",
        modalBgColor: "#FCFDFE",
        bgColorOfSateliteDetails: "#EDEFF7",
        darkColorText: "#070C08",
      },
    },
  },
  plugins: [],
};
