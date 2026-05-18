/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        vault: {
          950: '#050508',
          900: '#0a0a10',
          850: '#0f0f18',
          800: '#14141f',
          700: '#1c1c2a',
          600: '#2a2a3d',
          500: '#3d3d56',
        },
        accent: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.35)',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(16, 185, 129, 0.45)',
        'glow-sm': '0 0 24px -6px rgba(16, 185, 129, 0.3)',
        card: '0 4px 24px -4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        'card-hover': '0 12px 40px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(16, 185, 129, 0.15)',
      },
      backgroundImage: {
        'mesh': 'radial-gradient(at 40% 20%, rgba(16, 185, 129, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.05) 0px, transparent 50%)',
        'gradient-accent': 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
        'gradient-sidebar': 'linear-gradient(180deg, rgba(20, 20, 31, 0.95) 0%, rgba(10, 10, 16, 0.98) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.45s ease-out forwards',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
