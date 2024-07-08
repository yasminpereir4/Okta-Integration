/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./App.tsx"],
  theme: {
    extend: {
      fontFamily: {
        "nunito-300": "NunitoSans_300Light",
        "nunito-400": "NunitoSans_400Regular",
        "source-300": "SourceSansPro_300Light",
        "source-400": "SourceSansPro_400Regular",
        "source-600": "NunitoSans_600SemiBold",
      },
    },
  },
  plugins: [],
};
