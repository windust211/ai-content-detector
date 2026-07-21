import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d',
      },
    },
  },
  plugins: [],
} satisfies Config;
