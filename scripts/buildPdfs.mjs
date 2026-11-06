// CI step after `astro build`: print every cv page of the build to the pdf its Download link points at
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const buildDir = join(root, 'build');
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));

// every built page with a cv Download link: [page route, pdf path]
const cvs = walk(buildDir)
  .filter((f) => f.endsWith('index.html'))
  .flatMap((f) => {
    const href = readFileSync(f, 'utf8').match(/class="cv-download" href="([^"]+\.pdf)"/)?.[1];
    return href ? [[`/${relative(buildDir, f).replace(/index\.html$/, '')}`, href]] : [];
  });
if (!cvs.length) throw new Error('no cv pages found in build/');

const server = await preview({ root, logLevel: 'warn', server: { port: 4399 } });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const [route, href] of cvs) {
    await page.goto(`http://localhost:${server.port}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: join(buildDir, href), format: 'A4', printBackground: true });
    console.log(`pdf: build${href}`);
  }
} finally {
  await browser.close();
  await server.stop();
}
