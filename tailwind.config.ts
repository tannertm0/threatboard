import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-out-fast": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "spring-out": {
          "0%": { width: "0" },
          "60%": { width: "6px" },
          "80%": { width: "4px" },
          "100%": { width: "5px" },
        },
        "spring-out-vertical": {
          "0%": { height: "0" },
          "60%": { height: "6px" },
          "80%": { height: "4px" },
          "100%": { height: "5px" },
        },
        "spring-out-delayed": {
          "0%": { width: "0" },
          "60%": { width: "10px" },
          "80%": { width: "8px" },
          "100%": { width: "9px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-out-fast": "fade-out-fast 0.5s ease-out forwards",
        "spring-out": "spring-out 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards",
        "spring-out-vertical": "spring-out-vertical 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards",
        "spring-out-delayed": "spring-out-delayed 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
