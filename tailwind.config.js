/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        red: {
          100: '#FEE2E2',
          300: '#FCA5A5',
        },
        yellow: {
          100: '#FEF3C7',
          300: '#FCD34D',
        },
        green: {
          100: '#D1FAE5',
          300: '#6EE7B7',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}