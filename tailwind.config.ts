import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep navy + electric cyan, no green.
        navy: {
          950: "#050b1a",
          900: "#0a1628",
          800: "#122036",
          700: "#1a2c47",
        },
        cyan: {
          DEFAULT: "#06b6d4",
          bright: "#22d3ee",
          deep: "#0891b2",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.625rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(5,11,26,0.06)",
        card: "0 8px 24px rgba(5,11,26,0.08)",
        lift: "0 20px 50px rgba(5,11,26,0.18)",
      },
      maxWidth: {
        container: "1180px",
        prose: "46rem",
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease",
        "slide-up": "slideUp 0.35s ease",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
