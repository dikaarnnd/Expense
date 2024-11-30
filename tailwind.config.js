import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                GLight: ['Geist-Light', 'sans-serif'],
                GRegular: ['Geist-Regular', 'sans-serif'],
                GMedium: ['Geist-Medium', 'sans-serif'],
                GSemibold: ['Geist-Semibold', 'sans-serif'],
                GBold: ['Geist-Bold', 'sans-serif'],
                GBLACK: ['Geist-Black', 'sans-serif'],
            },
            colors: {
                allWhite: '#f1f1f1',
                allBlack: '#151515',
                paleBlack: '#505050',
                subheading: '#A7A7A7',
                primary: '#3961AB',
                darkprimary: '#374A6E',
                green: '#3D9883',
                darkGreen: '#236E5C',
                secondary: '#8756AE',
                alert: '#BB2323',
            },
            
        },
    },

    plugins: [forms, require('daisyui')],
};
