/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],   // IMPORTANT: include /src
  theme: {
    extend: {
      colors: {
        lbx: { bg: "#000000" },              // optional
      },
      backgroundImage: {
        // <-- These power bg-lbx-radial-top / center
        "lbx-radial-top":
          "radial-gradient(ellipse at top, rgba(245,158,11,0.20), rgba(127,29,29,0.10) 40%, transparent 70%)",
        "lbx-radial-center":
          "radial-gradient(ellipse at center, rgba(244,63,94,0.07), transparent 60%)",
      },
    },
  },
  plugins: [],
};
