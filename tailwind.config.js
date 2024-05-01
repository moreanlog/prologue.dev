/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            lineHeight: "2rem",
            a: {
              textDecoration: "none",
              color: theme("colors.cyan.600"),
              "font-weight": "500",
              "&:hover": {
                color: theme("colors.cyan.600"),
                textDecoration: "underline",
              },
            },
            code: {
              color: theme("colors.pink.500"),
              paddingLeft: "4px",
              paddingRight: "4px",
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.cyan.500"),
              "&:hover": {
                color: theme("colors.cyan.500"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
