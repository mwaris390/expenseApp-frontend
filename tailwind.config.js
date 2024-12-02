/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#286fdf",
        secondary: "#aab6c7",
        accent: "#9854f3",
        bgMain: "#ECEDFF",
        textMain: "#040e1c",
        newPrimary:"#4F55C3"
      },
    },
  },
  plugins: [],
};

