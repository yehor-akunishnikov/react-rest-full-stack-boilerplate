import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(process.cwd(), "../"));
  const API_URL = `${env.VITE_API_URL ?? "http://localhost:4200"}`;
  const PORT = `${env.VITE_PORT ?? "3000"}`;

  return {
    plugins: [react()],
    server: {
      port: Number(PORT),
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
