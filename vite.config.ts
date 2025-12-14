import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// TODO: Pre-rendering for SEO (BRD 15.1)
// Options to implement:
// 1. Post-build script using puppeteer to generate static HTML
// 2. Migrate to Next.js App Router (per BRD future migration path)
// 3. Use Vercel's ISR/SSG features after deployment
// Routes config at src/config/routes.ts is ready for any solution
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure proper chunking for SEO
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));
