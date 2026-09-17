import dns from 'node:dns';
import { defineConfig } from 'vite';
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3111
  },
  build: {
    outDir: './build',
    // the landing page's logo distance field is small and needed for the first frame,
    // so it ships inside the bundle instead of as a separate request
    assetsInlineLimit: (filePath) => (filePath.endsWith('jonasward_logo_sdf.png') ? true : undefined)
  },
  base: '/',
  resolve: {
    alias: {
      src: '/src'
    }
  }
});
