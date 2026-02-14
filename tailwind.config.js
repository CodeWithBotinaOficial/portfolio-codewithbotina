/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0f5', // Lavender Blush
          100: '#ffe4e1', // Misty Rose
          200: '#ffc0cb', // Pink
          300: '#ffb6c1', // Light Pink (Rose)
          400: '#dc143c', // Crimson Light
          500: '#b00000', // Crimson Medium
          600: '#8B0000', // Crimson (Main)
          700: '#4A0404', // Burgundy
          800: '#2d0202', // Dark Burgundy
          900: '#1a0000', // Very Dark
        },
        valentine: {
          'crimson': '#8B0000',
          'rose': '#FFB6C1',
          'burgundy': '#4A0404',
          'neon-pink': '#FF00FF',
          'muted-purple': '#800080',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
}