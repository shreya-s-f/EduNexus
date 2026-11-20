/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Red palette (Primary university brand)
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Dedicated custom colors requested: Red, Light Blue, Light Green, Pure Black
        'c-red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        'c-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'c-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Deep pure black dark-mode palette
        'dark-pure': '#000000',
        'dark-surface': '#0a0a0d',
        'dark-card': '#101015',
        'dark-elevated': '#16161f',
        'dark-border': '#22222d',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        card: '0 10px 30px -4px rgba(0, 0, 0, 0.08)',
        float: '0 20px 40px -6px rgba(0, 0, 0, 0.15)',
        '3d-red': '0 8px 24px -2px rgba(239, 68, 68, 0.35)',
        '3d-blue': '0 8px 24px -2px rgba(56, 189, 248, 0.35)',
        '3d-green': '0 8px 24px -2px rgba(74, 222, 128, 0.35)',
        'glow-red': '0 0 25px -2px rgba(239, 68, 68, 0.45)',
        'glow-blue': '0 0 25px -2px rgba(56, 189, 248, 0.45)',
        'glow-green': '0 0 25px -2px rgba(74, 222, 128, 0.45)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'tilt-3d': 'tilt3D 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        tilt3D: {
          '0%, 100%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'perspective(1000px) rotateX(6deg) rotateY(-8deg)' },
          '75%': { transform: 'perspective(1000px) rotateX(-6deg) rotateY(8deg)' },
        },
      },
    },
  },
  plugins: [],
};
