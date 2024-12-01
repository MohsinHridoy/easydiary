/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007bff',
        'danger': '#dc3545',
      },
      fontFamily: {
        'body': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

