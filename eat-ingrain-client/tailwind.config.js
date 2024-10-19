/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      "ingrain-color-background": "#F9CDAD",
      "ingrain-color-orange": "#F16B36",
      "ingrain-color-green": "#227238",
      "ingrain-color-blue": "#0B93F6",
      "ingrain-board-color": "#ECE5CE",
      "hover-button-color": "#143d03",
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F16935",

          "primary-content": "#000000",

          secondary: "#00ff00",

          "secondary-content": "#ff723a",

          accent: "#F16935",

          "accent-content": "#F16935",

          neutral: "#ff723a",

          "neutral-content": "#000000",

          "base-100": "ECE5CE",

          "base-200": "#ff723a",

          "base-300": "#ff723a",

          "base-content": "#140401",

          info: "#F16935",

          "info-content": "#F16935",

          success: "#F16935",

          "success-content": "#F16935",

          warning: "#F16935",

          "warning-content": "#001600",

          error: "#ff0000",

          "error-content": "#160000",
        },
      },
    ],
  },
};
