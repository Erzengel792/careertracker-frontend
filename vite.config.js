import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/", // ✅ เพิ่ม base ให้ Vite ใช้ path relative
  plugins: [
    react(),tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "staticwebapp.config.json",
          dest: ""
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  }
});
