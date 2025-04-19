/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
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
      },
      fontFamily: {
        serif: ["Source Serif 4", "Serif"],
      },
      gridTemplateColumns: {
        custom: "repeat(auto-fill, minmax(100px, 1fr))",
      },
      backgroundImage: {
        gridBack: "url('/src/assets/grid/background.svg')",
      },
      boxShadow: {
        reverse: "0 -20px 25px -5px rgba(148, 163, 184, 0.3)",
      },
      animation: {
        name: "animate 1s ease-in-out  1 forwards",
        des: "animate 1s ease-in-out 0.3s 1 forwards",
        but: "animate 1s ease-in-out 0.6s 1 forwards",
      },
      keyframes: {
        animate: {
          "0%": {
            opacity: "0",
            transform: "translate(0,100px)",
            filter: "blur(33px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
            filter: "blur(0)",
          },
        },
      },
    },
  },
};
