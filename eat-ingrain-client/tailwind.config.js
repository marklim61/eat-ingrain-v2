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

          "primary-content": "#140401",

          secondary: "#00ff00",

          "secondary-content": "#001600",

          accent: "#00ff00",

          "accent-content": "#001600",

          neutral: "#ff00ff",

          "neutral-content": "#160016",

          "base-100": "F16935",

          "base-200": "#d25c2e",

          "base-300": "#b34e25",

          "base-content": "#140401",

          info: "#ff00ff",

          "info-content": "#160016",

          success: "#00ff00",

          "success-content": "#001600",

          warning: "#00ff00",

          "warning-content": "#001600",

          error: "#ff0000",

          "error-content": "#160000",
        },
      },
    ],
  },
};
