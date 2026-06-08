import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/StateMS/',
  optimizeDeps: {
    include: ['react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap') || id.includes('node_modules/framer-motion') || id.includes('@gsap')) return 'animation'
          if (id.includes('node_modules/@mui') || id.includes('@emotion')) return 'mui'
          if (id.includes('node_modules/react') || id.includes('react-router-dom')) return 'react-vendor'
        },
      },
    },
  },
})
