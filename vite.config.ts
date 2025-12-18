import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// SSG via vite-react-ssg per BRD v32.1 Section 15.1
// Build command: vite-react-ssg build
// All 90+ marketing routes pre-rendered, admin routes CSR only
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
  // vite-react-ssg options - see BRD Appendix H for full documentation
  ssgOptions: {
    script: 'defer',
    formatting: 'minify',
    // Pre-render all marketing routes, exclude only admin (handled via SPA fallback)
    includedRoutes: (paths: string[]) => {
      return paths.filter(path => !path.startsWith('/admin'));
    },
  },
  // Note: manualChunks removed - incompatible with vite-react-ssg (causes "external module" error)
}));
