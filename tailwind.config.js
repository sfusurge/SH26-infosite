import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'background-blue': '#0283F7',
        'primary-black': '#141417',
        'primary-white':'#E1E7EE',
        'primary-gray': '#73879D',
        'primary-green':'#168458',
        'primary-red':'#EA0404',
      },
      fontFamily: {
        exposure: ['Exposure', 'sans-serif'],
        mori: ['PPMori', 'sans-serif'],
      },
      fontWeight: {
        extralight: '80',
        light: '60',
        regular: '0',
        semibold: '-40',
        extrabold: '-100',
      },
      transitionTimingFunction: {
        'copy': 'cubic-bezier(.2,.6,.2,1)',
      },
      transitionDuration: {
        'copy': '2200ms',
      },
      keyframes: {
        'stagger-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-10px)' },
          '40%, 80%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        'stagger-in': 'stagger-in 1.6s cubic-bezier(.2,.6,.2,1) 0.2s backwards',
        'stagger-in-delayed': 'stagger-in 1.6s cubic-bezier(.2,.6,.2,1) 0.4s backwards',
        'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) 0.3s both',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.font-light': { fontVariationSettings: "'EXPO' 60", fontWeight: '60' },
        '.font-regular': { fontVariationSettings: "'EXPO' 0", fontWeight: '0' },
        '.font-398': { fontVariationSettings: "'EXPO' 2", fontWeight: '2' },
        '.font-semibold': { fontVariationSettings: "'EXPO' -40", fontWeight: '-40' },
        '.font-extrabold': { fontVariationSettings: "'EXPO' -100", fontWeight: '-100' },
      });
    }),
  ],
}
