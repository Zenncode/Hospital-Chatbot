import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        shell: "#f5f1e8",
        ink: "#172235",
        teal: "#0f766e",
        slate: "#42526b",
        accent: "#d97745",
        mist: "#dce8ea",
        panel: "#fffaf2"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 34, 53, 0.08)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(15, 118, 110, 0.20), transparent 42%), radial-gradient(circle at bottom right, rgba(217, 119, 69, 0.18), transparent 34%)"
      }
    }
  },
  plugins: []
};

export default config;
