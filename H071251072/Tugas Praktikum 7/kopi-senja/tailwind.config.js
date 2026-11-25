/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
    extend: {
colors: {
        senja: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#d97706',
        700: '#b45309',
        900: '#78350f',
        }
    }
    },
},
plugins: [],
}