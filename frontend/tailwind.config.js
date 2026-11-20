/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36a8f6',
          500: '#0c8de4',
          600: '#026fc3',
          700: '#02589e',
          800: '#064b82',
          900: '#0a3f6c',
          950: '#072847',
        },
        navy: {
          800: '#0e1e38',
          900: '#081326',
          950: '#040b17',
        },
        accent: {
          purple: '#7c3aed',
          indigo: '#4f46e5',
          gold: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        card: '0 10px 30px -4px rgba(0, 0, 0, 0.08)',
        float: '0 20px 40px -6px rgba(14, 30, 56, 0.12)',
      },
    },
  },
  plugins: [],
};
