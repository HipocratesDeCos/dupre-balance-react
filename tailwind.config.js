/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif']
      },
      colors: {
        brand: {
          50:  '#e8f0fa',
          100: '#c5d9f4',
          500: '#1565c0',
          700: '#0f4c81',
          900: '#0a2f50'
        }
      }
    }
  },
  plugins: []
}
