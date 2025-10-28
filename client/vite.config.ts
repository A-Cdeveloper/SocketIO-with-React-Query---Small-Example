import { defineConfig } from "vitest/config";
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
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "node_modules",
        "dist",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/test/**",
        "**/__tests__/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/**/index.ts",
        "src/components/ui/**", // shadcn components
        "src/components/customComponents/**", // wrapper components
        "src/components/ErrorBoundary.tsx", // error boundary
        "src/components/layout/Header.tsx", // not testing
        "src/components/layout/MobileMenu.tsx", // not testing
        "src/components/layout/Navigation.tsx", // not testing
        "src/components/layout/UserArea.tsx", // not testing
        "src/components/layout/ThemeSwitcher.tsx", // not testing
        "src/components/layout/CustumLink.tsx", // not testing
        "src/components/layout/Logo.tsx", // not testing
        "src/components/layout/AppLayout.tsx", // not testing
        "src/components/layout/MainContent.tsx", // not testing
        "src/components/layout/ProtectedRoute.tsx", // not testing
        "src/features/auth/**", // auth (not testing)
        "src/features/cars/api/**", // API calls

        "src/features/cars/schemas/**", // schemas
        "src/features/cars/components/EditButtonGroup.tsx", // wrapper
        "src/features/cars/components/SingleCarDetails.tsx", // wrapper
        "src/hooks/useInfiniteScroll.ts", // not testing
        "src/hooks/useSocket.ts", // not testing
        "src/lib/apiClient.ts", // API client
        "src/lib/env.ts", // env config
        "src/pages/**", // page components
        "src/providers/**", // setup code
        "src/store/**", // zustand store
      ],
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
