import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/pingyiaf/',
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: 'dist',
  },
  define: {
    'import.meta.env.VITE_GITHUB_PAGES': JSON.stringify(true),
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
