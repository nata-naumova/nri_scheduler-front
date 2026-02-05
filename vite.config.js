import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  root: 'src',

  plugins: [preact()],

  envPrefix: 'VITE_',

  build: {
    outDir: '../dist',
    emptyOutDir: true
  },

  server: {
    open: true
  },

  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  }
})
