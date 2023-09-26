/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            width: {
                '300p': '300px',
                '312p': '312px',
                '600p': '600px',
                '700p': '700px',
                '900p': '900px'
            },
            height: {
                '300p': '300px',
                '312p': '312px',
                '340p': '340px'
            },
            backdropBlur: {
                sm: '2px'
            },
            screens: {
                'smallPhone': '400px',
                'phone': '550px',
            },
            container: {
                padding: {
                    DEFAULT: '0',
                    lg : '10px'
                },
            },
        },
        plugins: [],
    }
}