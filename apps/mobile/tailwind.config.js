/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "../../packages/ui-mobile/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pocket: {
          ink: "#081512",
          panel: "#0f1f1b",
          mint: "#9BE7C4",
          warning: "#F3C97B"
        }
      }
    }
  },
  plugins: []
};
