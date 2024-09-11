/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blue-background': "url('/public/imgs/6e6f27f0-0656-434e-9642-1f1e73c721c9.png')",
      },
    },
  },
  plugins: [],
}
