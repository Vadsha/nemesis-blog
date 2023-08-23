/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent' : 'transparent',
        'white' : '#eee',
        'black' : '#1f2937',
        'dark-blue' : '#324363',
        'blue' : '#3b82f6',
        'makeup-1' : '#ff4c60',
        'makeup-2' : '#fc5f6f',
        'gray-1' : '#374151',
        'gray-2' : '#6b7280',
      },
    },
  },
  plugins: [],
}
