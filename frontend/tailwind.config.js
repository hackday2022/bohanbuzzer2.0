/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        main: '0px 1px 8px rgba(0, 0, 0, 0.1)',
        icon: '0px 1px 8px rgba(0, 0, 0, 0.3)',
      },
      boxShadow: {
        main: '0px 1px 8px rgba(0, 0, 0, 0.1)',
        icon: '0px 1px 8px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        primary: '#FB9156',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
