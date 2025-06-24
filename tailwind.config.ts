import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        fontcolor: "var(--foreGround)",
      },
    },
  },
  plugins: [],
} satisfies Config;
