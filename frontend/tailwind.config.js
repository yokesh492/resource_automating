/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
     buttonBlue:'#005CE6',
     buttonHover:'#2196f3',
     dropDown: '#EDEDED',
      }
    },
  },
  plugins: [],
};
