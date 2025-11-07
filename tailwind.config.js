// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Based on the palette you sent:
        'primary': '#111111',     // The near-black for backgrounds
        'secondary': '#1E293B',   // The dark gray/slate for cards
        'accent': '#22C55E',       // The bright green for accents
        'accent-dark': '#166534',  // The darker green
        'light': '#F8FAFC',        // The white/light-gray for text
      }
    },
  },
  plugins: [],
}