import { createReadStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { imagetools } from 'vite-imagetools';

// the data, types and renderers import each other as `src/...`
const src = fileURLToPath(new URL('./src', import.meta.url));

// `?responsive` -> webp Picture with intrinsic size, `&card` only in the widths of an overview card
const RESPONSIVE_WIDTHS = [400, 800, 1200, 1600, 2400];
const CARD_WIDTHS = [200, 400];

// vite-imagetools 12 re-encodes a cached image with sharp's defaults when the dev server serves it, so `&lossless`
// images come out as lossy webp in dev; serve the cached file as it is (the build already uses it unchanged)
const IMAGETOOLS_CACHE = fileURLToPath(new URL('./node_modules/.cache/imagetools', import.meta.url));
const serveCachedImages = () => ({
  name: 'serve-cached-images',
  apply: 'serve',
  // imagetools is a 'pre' plugin; ours has to register its middleware before it
  enforce: 'pre',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const id = req.url?.match(/^\/@imagetools\/([0-9a-f]+)$/)?.[1];
      const file = id && join(IMAGETOOLS_CACHE, id);
      if (!file || !existsSync(file)) return next();
      res.setHeader('Content-Type', 'image/webp');
      createReadStream(file).pipe(res);
    });
  }
});

export default defineConfig({
  site: 'https://jonasward.ch',
  outDir: './build',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // the old site rendered the landing at /main too, printed links may still point there
  redirects: { '/main': '/' },
  devToolbar: { enabled: false },
  vite: {
    plugins: [
      serveCachedImages(),
      imagetools({
        defaultDirectives: async (url, metadata) => {
          if (!url.searchParams.has('responsive')) return new URLSearchParams();
          const meta = await metadata();
          const targets = url.searchParams.has('card') ? CARD_WIDTHS : RESPONSIVE_WIDTHS;
          const width = meta.autoOrient?.width ?? meta.width ?? targets[0];
          const widths = targets.filter((w) => w < width);
          return new URLSearchParams({
            as: 'picture',
            format: 'webp',
            w: [...widths, Math.min(width, targets[targets.length - 1])].join(';')
          });
        }
      })
    ],
    resolve: { alias: { src } }
  }
});
