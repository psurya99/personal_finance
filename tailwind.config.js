/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9', // Sky blue-ish
                    600: '#0284c7',
                    700: '#0369a1',
                    900: '#0c4a6e',
                },
                accent: {
                    500: '#8b5cf6', // Violet
                    600: '#7c3aed',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Assuming Inter is available or we'll stick to default sans for now and rely on system fonts looking good
            }
        },
    },
    plugins: [],
}
