import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-js-jsx-and-css-mastering-front-end-development-arynjeri/',
  plugins: [react(), tailwindcss()],
})
