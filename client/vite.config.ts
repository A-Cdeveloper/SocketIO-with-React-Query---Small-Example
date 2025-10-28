import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - rarely change, cache forever
          "react-vendor": ["react", "react-dom", "react-router"],
          "query-vendor": [
            "@tanstack/react-query",
            "@tanstack/react-query-devtools",
          ],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          "ui-vendor": ["lucide-react", "sonner", "next-themes"],
          "utils-vendor": [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
          "socket-vendor": ["socket.io-client"],
          "state-vendor": ["zustand"],
        },
      },
    },
  },
});
