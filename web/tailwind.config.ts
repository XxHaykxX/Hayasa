import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A3A5C',
        muted: '#6A8A88',
        aqua: '#EEF9F7',
        mist: '#F0F4F3',
        edge: '#D0E8E4',
        amber: '#E2685E',
        'amber-dark': '#C9543F',
        yellow: '#FFE20B',
        teal: '#1A7A8A',
        'teal-dark': '#156876',
        success: '#2A9D6A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
