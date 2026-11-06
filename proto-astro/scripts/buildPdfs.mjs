// CI step after `astro build`: print every cv page of the build to build/<route>/<variant>.pdf
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';

// playwright is preinstalled globally in CI and here, not a dependency of the site (require() honours NODE_PATH)
const { chromium } = createRequire(import.meta.url)('playwright');

const root = fileURLToPath(new URL('..', import.meta.url));
const CVS = [{ route: '/cv/', file: 'build/cv/cv.pdf' }];

const server = await preview({ root, logLevel: 'warn', server: { port: 4399 } });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const { route, file } of CVS) {
    await page.goto(`http://localhost:${server.port}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: fileURLToPath(new URL(`../${file}`, import.meta.url)), format: 'A4', printBackground: true });
    console.log(`pdf: ${file}`);
  }
} finally {
  await browser.close();
  await server.stop();
}
