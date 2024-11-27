/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ibm: {
          blue: '#0f62fe',
          gray: '#f4f4f4',
          text: '#161616',
          secondary: '#525252',
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      }
    }
  },
  plugins: [],
};


