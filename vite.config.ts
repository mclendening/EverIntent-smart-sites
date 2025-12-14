import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";
import { prerenderRoutes } from "./src/config/routes";

const Renderer = vitePrerender.PuppeteerRenderer;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: prerenderRoutes,
        renderer: new Renderer({
          renderAfterDocumentEvent: "render-event",
          headless: true,
        }),
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
