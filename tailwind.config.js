/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#ffffff',
        surface:  '#ebebeb',
        border:   '#aeaeae',
        accent:   '#00c368',
        cyan:     '#37c4e1',
        muted:    '#404040',
        dim:      '#d6d6d6',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        ui:   ['"Syne"', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulse_slow: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.5 },
        },
        scan: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.4s ease forwards',
        'pulse-slow': 'pulse_slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
