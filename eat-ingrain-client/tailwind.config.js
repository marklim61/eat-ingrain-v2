/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'ingrain-color-background': '#F9CDAD',
      'ingrain-color-orange': '#F16B36',
      'ingrain-color-green': '#227238',
      'ingrain-color-blue': '#0B93F6',
      'ingrain-board-color': '#ECE5CE',
      'hover-button-color' : '#143d03'
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [],
  },
}

