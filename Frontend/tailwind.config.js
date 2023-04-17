/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Epilogue', 'sans-serif']
      },
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: []
}
