import dns from 'node:dns';
import { defineConfig } from 'vite';
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3117,
  },
  build: {
    outDir: './build',
  },
  base: '/',
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
