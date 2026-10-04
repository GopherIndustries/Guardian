import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Where "npm run dev" sends /api requests.
// Default: the deployed backend. To use a local Docker backend, create
// .env.local with: VITE_PROXY_TARGET=http://localhost:3000
const DEFAULT_BACKEND = "https://guardian-backend-jade.vercel.app";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_PROXY_TARGET || DEFAULT_BACKEND;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          secure: target.startsWith("https"),
        },
      },
    },
  };
});
