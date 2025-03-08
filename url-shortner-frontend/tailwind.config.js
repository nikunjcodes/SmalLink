/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#0A0A0C", // Main background
          card: "#141417", // Card background
          light: "#1C1C21", // Lighter elements
        },
        brand: {
          primary: "#3B82F6", // Main brand color (blue)
          hover: "#2563EB", // Hover state
        },
        text: {
          primary: "#F8FAFC", // Main text
          secondary: "#94A3B8", // Secondary text
          muted: "#64748B", // Muted text
        },
        border: {
          light: "#1E1E24", // Light borders
          active: "#2563EB", // Active borders
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
