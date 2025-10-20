// Tailwind config — scans Pages Router folders
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}" // harmless if you don't use /app
  ],
  theme: { extend: {} },
  plugins: [],
};
