import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
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
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          foreground: "hsl(var(--highlight-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Semantic job board colors
        "company-card": "hsl(var(--company-card))",
        "role-item": "hsl(var(--role-item))",
        "filter-active": "hsl(var(--filter-active))",
        "salary-highlight": "hsl(var(--salary-highlight))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Expand/collapse for company groups (180-240ms)
        "expand-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "expand-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        // Subtle fade with minimal vertical motion (4-6px)
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Cross-fade for filter changes
        "cross-fade": {
          from: { opacity: "0.85" },
          to: { opacity: "1" },
        },
        // Page transition fade
        "page-enter": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Staggered reveal for role items
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        // Hero section entrance
        "hero-enter": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Stat counter pop
        "stat-pop": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "70%": { transform: "scale(1.02)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        // Blob floating animation for hero
        "blob-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(8px, -8px) scale(1.02)" },
          "66%": { transform: "translate(-4px, 4px) scale(0.98)" },
        },
        // Card list stagger entrance
        "card-enter": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Shimmer effect for loading states
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        // Company expand/collapse: 200ms ease-out
        "expand-down": "expand-down 200ms cubic-bezier(0.2, 0, 0, 1)",
        "expand-up": "expand-up 180ms cubic-bezier(0.2, 0, 0, 1)",
        // Role items fade in: 180ms
        "fade-in-up": "fade-in-up 180ms cubic-bezier(0.2, 0, 0, 1)",
        // Filter cross-fade: 150ms
        "cross-fade": "cross-fade 180ms ease-out",
        // Page transitions: 200ms
        "page-enter": "page-enter 250ms cubic-bezier(0.2, 0, 0, 1)",
        // Role item slide in
        "slide-in": "slide-in 200ms cubic-bezier(0.2, 0, 0, 1)",
        // Hero entrance - slightly longer for impact
        "hero-enter": "hero-enter 400ms cubic-bezier(0.2, 0, 0, 1)",
        // Stat pop animation
        "stat-pop": "stat-pop 300ms cubic-bezier(0.2, 0, 0, 1)",
        // Blob floating - slow, ambient
        "blob-float": "blob-float 12s ease-in-out infinite",
        // Card entrance
        "card-enter": "card-enter 250ms cubic-bezier(0.2, 0, 0, 1)",
        // Shimmer
        "shimmer": "shimmer 2s linear infinite",
      },
      // Calm transition defaults
      transitionDuration: {
        "micro": "150ms",
        "expand": "200ms",
        "smooth": "250ms",
      },
      transitionTimingFunction: {
        "calm": "cubic-bezier(0.2, 0, 0, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
