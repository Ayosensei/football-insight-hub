// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Add this 'server' section
  server: {
    proxy: {
      // Any request starting with '/api' will be proxied
      '/api': {
        target: 'https://api.football-data.org/v4', // The real API
        changeOrigin: true, // Needed for the API to trust the request
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' from the path
      },
    },
  },
})