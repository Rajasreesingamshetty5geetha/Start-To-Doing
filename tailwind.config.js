/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize:{
        'custom': ['1rem',{lineHeight: '1.7rem'}],
      },
      inset:{
        '50px' : '350px',
        '100px':'450px',
        '200px':'550px',
        '300px':'750px',
        'sm':'1.35rem',
        '3px':'3px',
        '13':'3.2rem',
        '1px': '1.25em',
        '34':'150px',
        

      },
      colors:{
        'color': '#91C8E4',
        'grey' : '#3c3c3c',
        
      },
      fontFamily: {
        'eduaustralia': ['"Edu Australia VIC WA NT Hand"','cursive','sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
