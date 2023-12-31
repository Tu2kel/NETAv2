import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:7260",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:7260",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
