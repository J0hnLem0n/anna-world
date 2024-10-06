import { defineConfig, loadEnv } from "vite";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
        },
      },
    },
  },
  define: {
    "import.meta.env.API_URL": JSON.stringify(process.env.API_URL),
  },
  server: {
    port: 3000,
  },
});
