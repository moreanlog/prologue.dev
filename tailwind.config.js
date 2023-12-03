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
      typography: (theme) => ( {
        DEFAULT: {
        css: {
        lineHeight: '2rem',
        a: {
          textDecoration: 'none',
          color: theme('colors.zinc.800'),
          'font-weight': '600',
          '&:hover': {
            color: theme('colors.zinc.900'),
            textDecoration: 'underline',
          },
        },
        } 
      },
      invert: {
        css: {
          a: {
            color: theme('colors.zinc.300'),
            '&:hover': {
              color: theme('colors.zinc.200'),
            },
          },
        },
      },
    }
    ),
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}
