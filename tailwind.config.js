/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1D3FAD',
          dark: '#142E88',
          light: '#2E55D4',
        },
        rose: {
          DEFAULT: '#BA2430',
          light: '#D93040',
          dark: '#8A1820',
        },
        cream: '#FAF8F4',
        charcoal: '#1C1C1C',
        'off-black': '#0F0F0F',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
