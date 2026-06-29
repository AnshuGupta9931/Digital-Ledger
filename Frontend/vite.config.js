import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import removeConsole from 'vite-plugin-remove-console';
export default defineConfig({
  plugins: [
    tailwindcss(),
    removeConsole(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://digital-ledger-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
