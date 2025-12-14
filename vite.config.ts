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
  // vite-react-ssg options
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Exclude admin routes from pre-rendering
    includedRoutes: (paths: string[]) => {
      return paths.filter(path => !path.startsWith('/admin'));
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));
