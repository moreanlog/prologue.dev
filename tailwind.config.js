/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
        css: {
        lineHeight: '2rem',
        a: {
          textDecoration: 'none',
          '&:hover': {
            color: 'gray.700',
            textDecoration: 'underline',
          },
        },
        } 
      }
    }
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}
