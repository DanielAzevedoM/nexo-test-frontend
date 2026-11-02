/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      colors: {
        nexo: {
          navy: '#1B2431',
          blue: '#0062C4',
          brand: '#037AF6',
          lightBlue: '#0285F7',
          gray: '#5B6472',
          lightGray: '#F6F7F9',
          border: '#E6E8EC',
          green: '#00BD6C',
          greenText: '#00804A',
          amber: '#F5A500',
          amberText: '#946300',
          red: '#EE343B',
          redText: '#C4161D',
        }
      }
    },
  },
  plugins: [],
}

