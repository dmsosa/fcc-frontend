import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/freecodecamp-frontend-challenges',
  plugins: [react()],
  server: {
    
  }
})
