/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen2: '#064749',
        customGreen3:'#31473A',
        customGreen:'#023020',
        backgroundCol1:'#D0D0D0',
        backgroundCol:"#white",
        customGreen1:"#404244",
        secondGray:"#f3f3f3",// Custom green color
        alternate:'#003e29',
        secondary: "#86efac",
        accent: "#dcfce1",
        accent1:"#090b19",
        neutral: "#14030c",
        base: "#f8fef7",
        info: "#22c55e",
        success: "#166534",
        warning: "#bf1d00",
        error: "#eb004b",
        secondGreen:"#49735A",
        darkGreen:"	#023020"
      },
      // letterSpacing: {
      //   custom: '3px', // Define your custom letter spacing here
      // },
      // spacing: {
      //   '72': '18rem',
      //   '84': '21rem',
      //   '96': '24rem',
      // },
      letterSpacing: {
        custom: '0.3rem',
      },
      // fontFamily: {
      //   'adallyn': ['"Adallyn Serif"', 'serif'],
      // },
      // fontFamily: {
      //   custom: ['CustomFont', 'sans-serif'],
      // },
      // letterSpacing: {
      //   tighter: '-.05em',
      //   tight: '-.025em',
      //   normal: '0',
      //   wide: '.025em',
      //   wider: '.05em',
      //   widest: '.1em',
      // },
    },
  },
  plugins: [],
}
