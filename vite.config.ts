import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll("\\", "/");
          if (
            moduleId.includes("/node_modules/react/") ||
            moduleId.includes("/node_modules/react-dom/")
          ) {
            return "vendor-react";
          }
          if (moduleId.includes("/node_modules/framer-motion/")) {
            return "vendor-motion";
          }
          if (moduleId.includes("/node_modules/@tanstack/react-query/")) {
            return "vendor-query";
          }
          if (moduleId.includes("/node_modules/fuse.js/")) {
            return "vendor-fuse";
          }
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
