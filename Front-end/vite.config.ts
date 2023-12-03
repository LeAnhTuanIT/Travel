import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { StrictMode } from 'react';

export default defineConfig({
  plugins: [
    react(), 
    
    
  ],
  base: '/',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/assets/') },
      { find: '~', replacement: path.resolve(__dirname, 'node_modules/') },

    ],
  }
});