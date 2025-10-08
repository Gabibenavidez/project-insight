import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/text-analysis': {
        target: 'https://eastus.api.cognitive.microsoft.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/text-analysis/, '/text/analytics/v3.0/sentiment'),
      },
    },
  },
})

