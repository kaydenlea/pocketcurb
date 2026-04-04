/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "../../packages/ui-web/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        web: {
          canvas: "#f6f6ef",
          mist: "#eef5f2",
          teal: "#0f766e",
          ink: "#0f172a"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.06)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};
