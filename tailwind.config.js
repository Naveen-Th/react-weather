/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gray-100': '#f7fafc',
        'gray-400': '#cbd5e0',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add this line
  ],
}
