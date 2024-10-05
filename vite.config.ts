import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      presets: ['jotai/babel/preset'],
    },
  }),
  viteCompression({
    algorithm: 'gzip',
    ext: '.gz', // File extension for compressed files
    threshold: 1024, // Minimum size for compressing files (in bytes)
  })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
