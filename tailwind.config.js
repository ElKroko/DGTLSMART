/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#333333',
        accent: '#00ff00',      // Terminal green
        accent2: '#00aa00',     // Darker green for contrast
        background: '#000000',  // Black background
        surface: '#111111',     // Slightly lighter black for contrast
        terminal: {
          green: '#00ff00',
          darkGreen: '#00aa00',
          text: '#00ff00',
          dim: '#006600',
          highlight: '#00ffaa',
        }
      },
      fontFamily: {
        sans: ['Courier New', 'Courier', 'monospace'],
        mono: ['VT323', 'Courier New', 'monospace'],
        terminal: ['VT323', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'terminal': '0 0 10px rgba(0, 255, 0, 0.5)',
        'terminal-inner': 'inset 0 0 10px rgba(0, 255, 0, 0.3)',
      },
      animation: {
        'cursor-blink': 'cursor-blink 1.5s infinite',
        'scanline': 'scanline 10s linear infinite',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
        'scanline': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
