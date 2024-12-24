/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        md: '12px',
        lg: '24px',
      },
      colors: {
        spinner: {
          DEFAULT: "#FFA500", // Custom orange color for spinner
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Scrollbar plugin
  ],
};
