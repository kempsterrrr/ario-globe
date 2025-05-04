import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: true,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  // Ignore type and lint checks during build
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
