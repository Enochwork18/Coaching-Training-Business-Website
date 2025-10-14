/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#A8D5BA',
        'sky-blue': '#CFEAFB',
        'warm-neutral': '#F5F3EE',
        'deep-teal': '#2A7F7F',
        'forest-green': '#2D5F4F',
        'charcoal': '#2C3E50',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config