/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          abyss: '#030712',
          void: '#050b18',
          deep: '#081026',
        },
        cyan: {
          glow: 'rgba(34, 211, 238, 0.35)',
        },
        violet: {
          glow: 'rgba(168, 85, 247, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

