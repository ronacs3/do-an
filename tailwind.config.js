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
            width: {
                board: '891px',
                user: '486px',
                sidebar: '180px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'device-1': '#6d90b9',
                'device-2': '#bbc7dc',
                allboard: '#6490FF',
            },
            height: {
                user: '450px',
                navbar: '70px',
            },
        },
    },
    plugins: [],
};
