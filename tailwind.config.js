/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                robo: ['Roboto', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                vietnampro: ['Be Vietnam Pro', 'sans-serif'],
            },
            padding: {
                x: '73px',
                y: '68px',
                z: '38px',
            },
        },
    },
    plugins: [],
};
