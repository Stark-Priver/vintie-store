/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        milk: 'var(--color-milk)',
        cream: 'var(--color-cream)',
        sand: 'var(--color-sand)',
        stone: 'var(--color-stone)',
        muted: 'var(--color-muted)',
        charcoal: '#2a2825',
        ink: 'var(--color-ink)',
        accent: '#c0392b',
        gold: '#d4a843',
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", 'serif'],
        body: ["'DM Sans'", 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0,0,0,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.08)',
        lift: '0 12px 40px rgba(0,0,0,0.14)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease both',
        fadeIn: 'fadeIn 0.3s ease both',
        slideRight: 'slideRight 0.35s cubic-bezier(0.4,0,0.2,1)',
        slideDown: 'slideDown 0.22s ease both',
      },
    },
  },
  plugins: [],
};
