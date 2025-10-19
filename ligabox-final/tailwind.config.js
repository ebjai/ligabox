
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { gold: "#D4A574", red: "#7A1F1F", cream: "#F3E8D8", black: "#0F0F0F" } },
      boxShadow: { glow: "0 0 0 1px rgba(212,165,116,0.4), 0 0 20px rgba(212,165,116,0.15)" }
    }
  },
  plugins: []
}
