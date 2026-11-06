import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { imagetools } from 'vite-imagetools';

// the content, types and utils stay in the parent repo, this prototype only renders them
const parentSrc = fileURLToPath(new URL('../src', import.meta.url));

// same image pipeline as ../vite.config.mts: `?responsive` -> webp Picture with intrinsic size
const RESPONSIVE_WIDTHS = [400, 800, 1200, 1600, 2400];
const CARD_WIDTHS = [200, 400];

export default defineConfig({
  site: 'https://jonasward.ch',
  outDir: './build',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // the react app rendered the landing at /main too, printed links may still point there
  redirects: { '/main': '/' },
  devToolbar: { enabled: false },
  vite: {
    plugins: [
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
    resolve: { alias: { src: parentSrc } },
    server: { fs: { allow: ['..'] } }
  }
});
