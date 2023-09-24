/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            primary: '#71afb5',
            lightBlue: '#a9c9cc',
            red: '#dd1915',
            orange: '#FF674D'
          }
      },
    },
    plugins: [],
  }

//   #71afb5
//#a9c9cc

//rgba(255, 99, 132, 0.5) - soft red