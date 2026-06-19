import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        primary: 'var(--primary)',
        'primary-deep': 'var(--primary-deep)',
        accent: 'var(--accent)',
        warm: 'var(--warm)',
        paper: 'var(--paper)',
      },
    },
  },
  plugins: [],
};

export default config;
