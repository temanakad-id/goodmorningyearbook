import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: { DEFAULT: '#e6005c', light: '#ff1a75', dark: '#cc0052' },
        dark: { DEFAULT: '#0a0a0a', 2: '#1a1a1a', 3: '#2a2a2a' },
        'gray-bg': '#f8f8f8'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Sora', 'sans-serif']
      }
    },
  },
  plugins: [],
};
export default config;
