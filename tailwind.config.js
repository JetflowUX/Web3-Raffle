import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a2c38",
        primary: "#1fff20",
        secondary: "#213743",
        accent: "#2f4553",
        card: "#213743",
        border: "#2f4553",
        text: "#ffffff",
        muted: "#b1bad3",
        "text-muted": "#b1bad3"
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(0, 231, 1, 0.25)",
        card: "0 24px 80px rgba(15, 33, 46, 0.55)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" }
        }
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite"
      }
    }
  },
  plugins: [animate]
};