/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#070A0F",
        card: "#0D1219",
        input: "#11161D",
        border: "#1B2632",
        cyan: {
          DEFAULT: "#18D5E8",
          400: "#18D5E8",
          300: "#45E0F0",
          500: "#0EBACD",
        },
        green: {
          DEFAULT: "#35E6A2",
          400: "#35E6A2",
          300: "#5EEAB3",
          500: "#22C582",
        },
        purple: {
          DEFAULT: "#A78BFA",
          400: "#A78BFA",
          300: "#C4B5FD",
          500: "#8B5CF6",
        },
        text: {
          main: "#F5F7FA",
          muted: "#7F8A99",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
