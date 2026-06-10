/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50:  '#eef2f7',
          100: '#dce6ef',
          200: '#b9cde0',
          300: '#90afc9',
          400: '#6a90b2',
          500: '#4e799e',
          600: '#3d6187',
          700: '#2f4e70',
          800: '#243d58',
          900: '#1f3a5f',
          950: '#0e1f3a',
        },
        sand: {
          50:  '#fef6ef',
          100: '#fdebd8',
          200: '#fad4b0',
          300: '#f6b87e',
          400: '#f09249',
          500: '#d87a2e',
          600: '#b46220',
          700: '#934e18',
          800: '#7a4017',
          900: '#663614',
        },
      },
      boxShadow: {
        soft: '0 1px 3px rgba(14,31,58,0.06), 0 1px 2px rgba(14,31,58,0.04)',
        card: '0 4px 16px rgba(14,31,58,0.10), 0 1px 4px rgba(14,31,58,0.06)',
      },
    },
  },
  plugins: [],
}
