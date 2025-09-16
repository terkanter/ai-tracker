import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#ffffff", // Белый фон как на скриншоте
            foreground: "#000000", // Черный текст
            primary: {
              50: "#fefce8",
              100: "#fef9c3",
              200: "#fef08a",
              300: "#fde047",
              400: "#facc15",
              500: "#eab308", // Main yellow
              600: "#ca8a04",
              700: "#a16207",
              800: "#854d0e",
              900: "#713f12",
              DEFAULT: "#eab308",
              foreground: "#000000",
            },
            secondary: {
              50: "#f0f9ff",
              100: "#e0f2fe",
              200: "#bae6fd",
              300: "#7dd3fc",
              400: "#38bdf8",
              500: "#0ea5e9",
              600: "#0284c7",
              700: "#0369a1",
              800: "#075985",
              900: "#0c4a6e",
              DEFAULT: "#0ea5e9",
              foreground: "#ffffff",
            },
            focus: "#eab308",
            // Content colors for cards, modals, etc.
            content1: {
              DEFAULT: "#ffffff", // Белый для карточек
              foreground: "#000000",
            },
            content2: {
              DEFAULT: "#f8fafc", // Очень светло-серый для вложенного контента
              foreground: "#000000",
            },
          },
        },
        dark: {
          colors: {
            background: "#0a0a0a", // Темный фон как на скриншоте
            foreground: "#ffffff", // Белый текст
            primary: {
              50: "#1a1a0a",
              100: "#333314",
              200: "#4d4d1f",
              300: "#666629",
              400: "#808033",
              500: "#fbbf24", // Brighter yellow for dark theme
              600: "#fcd34d",
              700: "#fde68a",
              800: "#fef3c7",
              900: "#fffbeb",
              DEFAULT: "#fbbf24",
              foreground: "#000000",
            },
            secondary: {
              50: "#0c1220",
              100: "#182437",
              200: "#24364e",
              300: "#304865",
              400: "#3c5a7c",
              500: "#60a5fa",
              600: "#93c5fd",
              700: "#bfdbfe",
              800: "#dbeafe",
              900: "#eff6ff",
              DEFAULT: "#60a5fa",
              foreground: "#000000",
            },
            focus: "#fbbf24",
            // Content colors for cards, modals, etc.
            content1: {
              DEFAULT: "#18181b", // Темно-серый для карточек
              foreground: "#ffffff",
            },
            content2: {
              DEFAULT: "#27272a", // Чуть светлее для вложенного контента
              foreground: "#ffffff",
            },
            // Default neutral colors
          },
        },
      },
    }),
  ],
};

module.exports = config;
