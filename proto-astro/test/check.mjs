// checks success criteria 1-8 of the plan against the built prototype (proto-astro/build) and,
// for the screenshots, the current react build (../build).
//   node test/check.mjs            -> test the existing build
//   node test/check.mjs --build    -> run `bun run build` first (and time it)
//   node test/check.mjs --no-shots -> skip criterion 8
import { execFileSync, execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dev, preview } from 'astro';

const { chromium } = createRequire(import.meta.url)('playwright');
const proto = fileURLToPath(new URL('..', import.meta.url));
const repo = join(proto, '..');
const buildDir = join(proto, 'build');
const reactBuild = join(repo, 'build');
const shotsDir = join(proto, 'test/screenshots');
const args = new Set(process.argv.slice(2));

const results = [];
const report = (id, ok, detail = '') => {
  results.push({ id, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} [${id}] ${detail}`);
};
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));

// --- criterion 1: build + no react & co in deps or output ---
if (args.has('--build')) {
  const start = Date.now();
  try {
    execSync('bun run build', { cwd: proto, stdio: 'inherit' });
    report('1a', true, `bun run build exited 0 in ${((Date.now() - start) / 1000).toFixed(1)}s`);
  } catch {
    report('1a', false, 'bun run build failed');
    process.exit(1);
  }
} else report('1a', existsSync(join(buildDir, 'index.html')), 'build/ present (run with --build to rebuild)');

const BANNED = ['react', 'react-dom', 'react-router-dom', 'zustand', '@react-pdf/renderer'];
const pkg = JSON.parse(readFileSync(join(proto, 'package.json'), 'utf8'));
const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
const bannedDeps = deps.filter((d) => BANNED.includes(d));
const files = walk(buildDir);
const jsFiles = files.filter((f) => f.endsWith('.js'));
// signatures of the runtimes in a minified bundle
const SIGNATURES = [/react\.production/, /__SECRET_INTERNALS|__CLIENT_INTERNALS/, /react-router/, /zustand/, /@react-pdf|react-pdf/, /useSyncExternalStore/];
const jsHits = jsFiles.flatMap((f) => SIGNATURES.filter((s) => s.test(readFileSync(f, 'utf8'))).map((s) => `${f}: ${s}`));
report('1b', bannedDeps.length === 0 && jsHits.length === 0, `deps: [${deps.join(', ')}]; ${jsFiles.length} js files, framework signatures: ${jsHits.length ? jsHits.join('; ') : 'none'}`);

// --- expected state from the real data and the real store ---
const expected = JSON.parse(execFileSync('bun', ['test/expected.ts'], { cwd: proto, encoding: 'utf8' }));

// --- static server for the react build (hash router, so a plain file server will do) ---
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };
const serveStatic = (dir, port) =>
  new Promise((resolve) => {
    const server = createServer((req, res) => {
      let path = join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
      if (!existsSync(path)) return res.writeHead(404).end('not found');
      res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(readFileSync(path));
    }).listen(port, () => resolve(server));
  });

// runs before preview(): astro's preview switches the process to production mode, after which dev() renders as prod
// --- criterion 6: motivation letter only in dev ---
const inBuild = files.filter((f) => /motivation/i.test(f) || (f.endsWith('.html') && /data-ml-form/.test(readFileSync(f, 'utf8'))));
const devStart = Date.now();
const devServer = await dev({ root: proto, logLevel: 'error', server: { port: 4397 } });
const devReady = Date.now() - devStart;
let devOk = false;
try {
  const devBrowser = await chromium.launch();
  const page = await devBrowser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  {
    const response = await page.goto(`http://localhost:${devServer.address.port}/create-motivation-letter/`);
    await page.click('[data-ml-drawer]');
    await page.fill('input[name="title"]', 'Hello letter');
    const preview = await page.textContent('[data-ml="title"]');
    const stored = await page.evaluate(() => localStorage.getItem('motivationLetterPreviousData'));
    devOk = response.status() === 200 && preview === 'Hello letter' && stored?.includes('Hello letter') && errors.length === 0;
  }
  await devBrowser.close();
} finally {
  await devServer.stop();
}
report('6', devOk && inBuild.length === 0, `dev: ${devOk ? 'form -> preview + localStorage work' : 'broken'} (dev server ready in ${devReady}ms); in build/: ${inBuild.length ? inBuild.join(', ') : 'absent'}`);

const protoServer = await preview({ root: proto, logLevel: 'error', server: { port: 4398 } });
const P = `http://localhost:${protoServer.port}`;
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

const visit = async (url, fn) => {
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  try {
    const response = await page.goto(url, { waitUntil: 'load' });
    return await fn(page, response, errors);
  } finally {
    await page.close();
  }
};

// --- criterion 2: every project page ---
const projectFailures = [];
for (const { webstring } of expected.projects) {
  await visit(`${P}/project/${webstring}/`, async (page, response, errors) => {
    const info = await page.evaluate(async () => {
      const hero = document.querySelector('.main-image img');
      if (hero && !hero.complete) await new Promise((r) => hero.addEventListener('load', r, { once: true }));
      const imgs = [...document.querySelectorAll('img.responsive-img')];
      return {
        heroWidth: hero?.naturalWidth ?? 0,
        // vectors have no resized variants, and rasters at most 400px wide only one (see RESPONSIVE_WIDTHS)
        missingSrcset: imgs
          .filter((i) => !/\.svg(\?|$)/.test(i.getAttribute('src')) && Number(i.getAttribute('width')) > 400 && !i.srcset)
          .map((i) => i.src),
        imgCount: imgs.length
      };
    });
    const problems = [
      response.status() !== 200 && `status ${response.status()}`,
      errors.length && `console errors: ${errors.join(' | ')}`,
      info.heroWidth === 0 && 'hero not loaded',
      info.missingSrcset.length && `no srcset: ${info.missingSrcset.join(', ')}`
    ].filter(Boolean);
    if (problems.length) projectFailures.push(`${webstring}: ${problems.join('; ')}`);
  });
}
report('2', projectFailures.length === 0, `${expected.projects.length} project pages${projectFailures.length ? `; ${projectFailures.join(' || ')}` : ' all 200, no console errors, hero loaded, srcset present'}`);

// --- criterion 3: overview filters ---
const visibleCards = (page) =>
  page.$$eval('.project-card', (cards) =>
    cards.filter((c) => !c.hidden && c.offsetParent !== null).map((c) => c.getAttribute('href').split('/')[2])
  );
const sameSet = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();
const filterProblems = [];
await visit(`${P}/projects/`, async (page, response, errors) => {
  const all = await visibleCards(page);
  if (!sameSet(all, expected.projects.map((p) => p.webstring))) filterProblems.push(`default shows ${all.length}/${expected.projects.length}`);
  if (errors.length) filterProblems.push(`console errors: ${errors.join(' | ')}`);
});
for (const c of expected.cases) {
  const q = new URLSearchParams();
  if (c.keywords.length) q.set('k', c.keywords.join(','));
  if (c.category !== 'All') q.set('c', c.category);
  await visit(`${P}/projects/?${q}`, async (page) => {
    const shown = await visibleCards(page);
    if (!sameSet(shown, c.expected)) filterProblems.push(`${q}: shows ${shown.length}, applyFilters ${c.expected.length}`);
  });
}
// toggling through the ui updates ?k= and a reload restores it
const toggleCase = expected.cases[2];
await visit(`${P}/projects/`, async (page) => {
  const kw = toggleCase.keywords[0].toLowerCase();
  await page.fill('.kf-input', kw);
  await page.locator('.kf-suggestion', { hasText: new RegExp(`^${kw}$`) }).first().dispatchEvent('mousedown');
  const url = new URL(page.url());
  if (url.searchParams.get('k') !== kw) filterProblems.push(`after toggling ${kw} the url is ${page.url()}`);
  const before = await visibleCards(page);
  if (!sameSet(before, toggleCase.expected)) filterProblems.push(`toggled ${kw}: shows ${before.length}, expected ${toggleCase.expected.length}`);
  await page.reload();
  const after = await visibleCards(page);
  if (!sameSet(after, before)) filterProblems.push(`reload with ?k= shows ${after.length} instead of ${before.length}`);
  await page.click('.kf-chip');
  if (new URL(page.url()).searchParams.has('k')) filterProblems.push('removing the chip keeps ?k=');
  if ((await visibleCards(page)).length !== expected.projects.length) filterProblems.push('removing the chip does not show all');
});
// a keyword chip on a card adds the keyword
await visit(`${P}/projects/`, async (page) => {
  const card = page.locator('.project-card').first();
  await card.locator('[data-keywords-toggle]').click();
  const chip = card.locator('.project-chip').first();
  const kw = await chip.getAttribute('data-keyword');
  await chip.click();
  if (new URL(page.url()).pathname !== '/projects/' || new URL(page.url()).searchParams.get('k') !== kw)
    filterProblems.push(`card chip ${kw} -> ${page.url()}`);
});
report('3', filterProblems.length === 0, `default + ${expected.cases.length} cases (${expected.cases.map((c) => `${c.category}/${c.keywords.join('+') || '-'}=${c.expected.length}`).join(', ')}) + ui toggle/reload + card chip${filterProblems.length ? `; ${filterProblems.join(' || ')}` : ''}`);

// --- criterion 4: hash redirects + 404 ---
const redirectProblems = [];
for (const [from, to] of [['/#/project/repurposed', '/project/repurposed/'], ['/#/cv', '/cv/'], ['/#/projects?k=solo', '/projects/?k=solo']]) {
  await visit(`${P}${from}`, async (page) => {
    await page.waitForURL((u) => u.pathname + u.search === to, { timeout: 5000 }).catch(() => {});
    const u = new URL(page.url());
    if (u.pathname + u.search !== to) redirectProblems.push(`${from} -> ${u.pathname}${u.search}`);
  });
}
await visit(`${P}/this/does/not/exist/`, async (page, response) => {
  const text = await page.textContent('body');
  if (response.status() !== 404 || !text.includes('wrong turn')) redirectProblems.push(`unknown path: ${response.status()}`);
});
report('4', redirectProblems.length === 0, redirectProblems.join('; ') || '/#/project/repurposed, /#/cv, /#/projects?k= redirect; unknown path -> 404 page');

// --- criterion 5: cv pdf ---
const pdfPath = join(buildDir, 'cv/cv.pdf');
let pdfOk = false;
let pdfDetail = 'build/cv/cv.pdf missing';
if (existsSync(pdfPath)) {
  const raw = readFileSync(pdfPath, 'latin1');
  const boxes = [...raw.matchAll(/\/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)\s*\]/g)].map((m) => [Math.round(m[1]), Math.round(m[2])]);
  // A4 is 595.3 x 841.9pt, chromium rounds the page to whole css pixels
  const a4 = boxes.length > 0 && boxes.every(([w, h]) => Math.abs(w - 595) <= 1.5 && Math.abs(h - 842) <= 1.5);
  const text = execFileSync('pdftotext', [pdfPath, '-'], { encoding: 'utf8' });
  const hasText = text.includes('Jonas Ward') && text.includes('Van den Bulcke') && text.includes('jonas@jonasward.ch');
  const href = await visit(`${P}/cv/`, (page) => page.getAttribute('.cv-download', 'href'));
  const pdfResponse = await fetch(new URL(href, P));
  pdfOk = a4 && hasText && href === '/cv/cv.pdf' && pdfResponse.ok;
  pdfDetail = `${boxes.length} page(s) ${a4 ? 'A4' : `not A4 ${JSON.stringify(boxes)}`}, name+email text ${hasText ? 'found' : 'missing'}, Download href ${href} -> ${pdfResponse.status}`;
}
report('5', pdfOk, pdfDetail);


// --- criterion 7: data untouched ---
const dataDiff = execSync('git status --porcelain -- src/data', { cwd: repo, encoding: 'utf8' }).trim();
report('7', dataDiff === '', dataDiff || 'git status src/data: clean');

// --- criterion 8: screenshots, react build vs prototype ---
if (!args.has('--no-shots')) {
  mkdirSync(shotsDir, { recursive: true });
  const reactServer = existsSync(join(reactBuild, 'index.html')) ? await serveStatic(reactBuild, 4396) : null;
  const R = 'http://localhost:4396';
  const pages = [
    ['project-digitale-augen', '/#/project/digitale-augen', '/project/digitale-augen/'],
    ['project-chocolade-chaud', '/#/project/chocolade-chaud', '/project/chocolade-chaud/'],
    ['project-anitkabir', '/#/project/anitkabir', '/project/anitkabir/'],
    ['project-sdf-svg', '/#/project/sdf-svg', '/project/sdf-svg/'],
    ['projects', '/#/projects', '/projects/'],
    ['cv', '/#/cv', '/cv/']
  ];
  const shots = [];
  for (const [viewportName, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: viewportName === 'mobile', hasTouch: viewportName === 'mobile' });
    for (const [name, reactPath, protoPath] of pages) {
      for (const [site, base, path] of [['react', R, reactPath], ['astro', P, protoPath]]) {
        if (site === 'react' && !reactServer) continue;
        const page = await ctx.newPage();
        await page.goto(base + path, { waitUntil: 'networkidle' });
        await page.evaluate(async () => {
          // walk down the page so lazy images load, then back up
          for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
            scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          scrollTo(0, 0);
          // lazy images that never enter the viewport (e.g. the horizontal row on phones) don't load, so wait at most 5s
          const pending = [...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => (i.onload = i.onerror = r)));
          await Promise.race([Promise.all(pending), new Promise((r) => setTimeout(r, 5000))]);
          await document.fonts.ready;
        });
        await page.waitForTimeout(800);
        const file = join(shotsDir, `${name}-${viewportName}-${site}.png`);
        await page.screenshot({ path: file, fullPage: true });
        await page.screenshot({ path: file.replace('.png', '-top.png') });
        shots.push(file);
        await page.close();
      }
    }
    await ctx.close();
  }
  reactServer?.close();
  report('8', shots.length > 0, `${shots.length} full-page screenshots (+ "-top" viewport crops) in test/screenshots/${reactServer ? '' : ' (react build missing, only astro)'}; compare by eye`);
}

await browser.close();
await protoServer.stop();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed${failed.length ? `, failed: ${failed.map((f) => f.id).join(', ')}` : ''}`);
process.exit(failed.length ? 1 : 0);
