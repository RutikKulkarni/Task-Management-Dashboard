/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "primary-dark": "#2563eb",
        secondary: "#64748b",
        todo: "#f3f4f6",
        inprogress: "#fef3c7",
        done: "#d1fae5",
      },
    },
  },
  plugins: [],
};
