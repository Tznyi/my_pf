import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://tznyi.github.io/my_pf/
export default defineConfig({
  plugins: [react()],
  base: '/my_pf/',
})
