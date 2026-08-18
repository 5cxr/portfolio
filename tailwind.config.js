/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['var(--font-caveat)', 'cursive'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        grid: 'var(--grid)',
        red: 'var(--red)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
};
