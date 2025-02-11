/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", 
        secondary: "#6366f1",
        background: "#111827",
        foreground: "#f3f4f6",
        accent: "#10b981",

      },
    },
  },
  plugins: [],
};
