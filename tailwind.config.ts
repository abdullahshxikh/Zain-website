import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        zumfali: {
          green: '#1a2f23',
          emerald: '#2d4a38',
          gold: '#bb9c30',
          goldLight: '#d4b554',
          cream: '#f5f5dc',
          light: '#FAFAF9',
        },
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #bb9c30 0%, #d4b554 100%)',
        'deep-gradient': 'linear-gradient(135deg, #1a2f23 0%, #2d4a38 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slow-spin': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
