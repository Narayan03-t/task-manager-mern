/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        mist: "#eef4ff",
        accent: "#fb7185",
        sand: "#f6c178",
        aqua: "#7dd3fc",
      },
      boxShadow: {
        panel: "0 20px 45px rgba(8, 17, 31, 0.18)",
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

