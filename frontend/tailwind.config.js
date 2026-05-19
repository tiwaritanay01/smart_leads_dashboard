/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#0f0f14",
        cloud: "#f8f5ef",
        sand: "#f1e9da",
        mint: "#5fb49c",
        ember: "#e07a5f",
        slate: "#5f6270"
      },
      boxShadow: {
        soft: "0 12px 24px -12px rgba(15, 15, 20, 0.25)"
      }
    }
  },
  plugins: [],
}

