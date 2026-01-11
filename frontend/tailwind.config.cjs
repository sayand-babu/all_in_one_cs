module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          black: "#0a0a0a",
          darkgray: "#1a1a1a",
          darker: "#0f0f1e",
          pink: "#ff006e",
          lime: "#39ff14",
          purple: "#b026ff",
          cyan: "#00f0ff",
          yellow: "#ffff00",
          white: "#ffffff",
          accent: "#0f3460",
          secondary: "#1a1a2e",
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
        tech: ['IBM Plex Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 10px rgba(0, 240, 255, 0.5)',
        'neon-lg': '0 0 20px rgba(0, 240, 255, 0.8), 0 0 30px rgba(255, 0, 110, 0.5)',
        'neon-pink': '0 0 15px rgba(255, 0, 110, 0.6)',
        'neon-lime': '0 0 15px rgba(57, 255, 20, 0.6)',
      },
      keyframes: {
        'neon-glow': {
          '0%, 100%': { textShadow: '0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(255, 0, 110, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(0, 240, 255, 0.8), 0 0 30px rgba(255, 0, 110, 0.5), 0 0 40px rgba(57, 255, 20, 0.3)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 20px rgba(0, 240, 255, 0.8)' },
        },
        'fade-in-down': {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          'from': { opacity: '0', transform: 'translateX(-30px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'fade-in': 'fade-in-down 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
