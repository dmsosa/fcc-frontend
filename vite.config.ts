import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/fcc-frontend',
  build: {
    outDir: './dist'
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'color-functions',
            'global-builtin',
            'legacy-js-api',
          ],
        },
    },
  },
})
