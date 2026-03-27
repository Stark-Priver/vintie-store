/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        milk: "#faf9f7",
        cream: "#f5f3ef",
        sand: "#e8e4dc",
        stone: "#c8c4bc",
        muted: "#8a867e",
        charcoal: "#2a2825",
        ink: "#111110",
        accent: "#c0392b",
        gold: "#d4a843",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.06)",
        card: "0 4px 24px rgba(0,0,0,0.08)",
        lift: "0 12px 40px rgba(0,0,0,0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.5rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4,0,0.2,1)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulse2: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease both",
        fadeIn: "fadeIn 0.3s ease both",
        slideRight: "slideRight 0.35s cubic-bezier(0.4,0,0.2,1)",
        slideDown: "slideDown 0.22s ease both",
        pulse2: "pulse2 1.5s ease infinite",
      },
    },
  },
  plugins: [],
};
