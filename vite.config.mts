import dns from 'node:dns';
import { defineConfig, Plugin } from 'vite';
import { imagetools } from 'vite-imagetools';
dns.setDefaultResultOrder('verbatim');

// widths generated for every `?responsive` image, capped at the original width
const RESPONSIVE_WIDTHS = [400, 800, 1200, 1600, 2400];

// fetch the main font right away instead of after the css is parsed, shortens the swap from the fallback font
const preloadMainFont = (): Plugin => ({
  name: 'preload-main-font',
  apply: 'build',
  transformIndexHtml: (_, ctx) => {
    const font = Object.keys(ctx.bundle ?? {}).find((file) => /montserrat-latin-wght-normal-.+\.woff2$/.test(file));
    if (!font) return;
    return [
      {
        tag: 'link',
        attrs: { rel: 'preload', href: `/${font}`, as: 'font', type: 'font/woff2', crossorigin: '' },
        injectTo: 'head'
      }
    ];
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preloadMainFont(),
    imagetools({
      // `import img from './x.jpg?responsive'` resolves to a Picture with webp variants and the intrinsic size,
      // so every image can reserve its box before it loads
      defaultDirectives: async (url, metadata) => {
        if (!url.searchParams.has('responsive')) return new URLSearchParams();
        // images get auto-oriented, so cap against the width after applying the exif rotation
        const meta = await metadata();
        const width = meta.autoOrient?.width ?? meta.width ?? RESPONSIVE_WIDTHS[0];
        const widths = RESPONSIVE_WIDTHS.filter((w) => w < width);
        return new URLSearchParams({
          as: 'picture',
          format: 'webp',
          w: [...widths, Math.min(width, RESPONSIVE_WIDTHS[RESPONSIVE_WIDTHS.length - 1])].join(';')
        });
      }
    })
  ],
  server: {
    port: 3111,
    // the projects overview pulls in every project's content and with it some 700 `?responsive` images,
    // each transformed on first request; transform them while the server starts instead of on the first visit
    warmup: {
      clientFiles: ['./src/components/projects/overview/ProjectOverview.tsx']
    }
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
