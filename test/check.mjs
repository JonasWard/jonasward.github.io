// checks the built site (build/): every page, filters, redirects, cv pdfs, dev-only pages, screenshots
//   node test/check.mjs            -> test the existing build
//   node test/check.mjs --build    -> run `bun run build` first (and time it)
//   node test/check.mjs --no-shots -> skip criterion 8
//   node test/check.mjs --links    -> list every link of criterion 9 and where it landed
import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dev, preview } from 'astro';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const buildDir = join(root, 'build');
const shotsDir = join(root, 'test/screenshots');
const args = new Set(process.argv.slice(2));

const results = [];
const report = (id, ok, detail = '') => {
  results.push({ id, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} [${id}] ${detail}`);
};
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));

// --- criterion 1: build + only the site's own tooling in deps, no framework runtime in the output ---
if (args.has('--build')) {
  const start = Date.now();
  try {
    execSync('bun run build', { cwd: root, stdio: 'inherit' });
    report('1a', true, `bun run build exited 0 in ${((Date.now() - start) / 1000).toFixed(1)}s`);
  } catch {
    report('1a', false, 'bun run build failed');
    process.exit(1);
  }
} else report('1a', existsSync(join(buildDir, 'index.html')), 'build/ present (run with --build to rebuild)');

// everything the site needs; a ui framework would have to be added here first
const ALLOWED = ['@fontsource-variable/montserrat', 'astro', 'playwright', 'vite-imagetools'];
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
const extraDeps = deps.filter((d) => !ALLOWED.includes(d));
const files = walk(buildDir);
const jsFiles = files.filter((f) => f.endsWith('.js'));
// the page scripts are small and vanilla; the landing one carries the logo distance field as a ~140 kB data url
const JS_BUDGET = 200 * 1024;
const jsBytes = jsFiles.reduce((sum, f) => sum + statSync(f).size, 0);
report('1b', extraDeps.length === 0 && jsBytes <= JS_BUDGET, `deps: [${deps.join(', ')}]${extraDeps.length ? `, not allowed: ${extraDeps.join(', ')}` : ''}; ${jsFiles.length} js files, ${(jsBytes / 1024).toFixed(1)} kB (budget ${JS_BUDGET / 1024} kB)`);

// --- expected state from the real data and filterProjects ---
const expected = JSON.parse(execFileSync('bun', ['test/expected.ts'], { cwd: root, encoding: 'utf8' }));

// runs before preview(): astro's preview switches the process to production mode, after which dev() renders as prod
// --- criterion 6: motivation letter only in dev ---
const inBuild = files.filter((f) => /motivation/i.test(f) || (f.endsWith('.html') && /data-ml-form/.test(readFileSync(f, 'utf8'))));
const devStart = Date.now();
const devServer = await dev({ root, logLevel: 'error', server: { port: 4397 } });
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

const server = await preview({ root, logLevel: 'error', server: { port: 4398 } });
const P = `http://localhost:${server.port}`;
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
    if (!sameSet(shown, c.expected)) filterProblems.push(`${q}: shows ${shown.length}, filterProjects ${c.expected.length}`);
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
// narrowing the window: as many columns as a fresh load at that width, nothing cut off, no sideways scroll
const layoutAt = (page) => page.evaluate(() => {
  const boxes = [...document.querySelectorAll('.project-card:not([hidden])')].map((c) => c.getBoundingClientRect());
  return { columns: new Set(boxes.map((b) => Math.round(b.left))).size, clipped: boxes.filter((b) => b.right > innerWidth + 1).length, sideways: document.documentElement.scrollWidth > innerWidth };
});
await visit(`${P}/projects/`, async (page) => {
  for (const width of [1100, 800, 600]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(300);
    const resized = await layoutAt(page);
    const fresh = await context.newPage().then(async (p) => {
      await p.setViewportSize({ width, height: 900 });
      await p.goto(`${P}/projects/`, { waitUntil: 'load' });
      await p.waitForTimeout(300);
      return layoutAt(p).finally(() => p.close());
    });
    if (resized.columns !== fresh.columns || resized.clipped || resized.sideways)
      filterProblems.push(`narrowed to ${width}px: ${resized.columns} columns (fresh load ${fresh.columns}), ${resized.clipped} cards cut off${resized.sideways ? ', scrolls sideways' : ''}`);
  }
});
report('3', filterProblems.length === 0, `default + ${expected.cases.length} cases (${expected.cases.map((c) => `${c.category}/${c.keywords.join('+') || '-'}=${c.expected.length}`).join(', ')}) + ui toggle/reload + card chip + narrowing window${filterProblems.length ? `; ${filterProblems.join(' || ')}` : ''}`);

// --- criterion 4: hash redirects + 404 ---
const redirectProblems = [];
for (const [from, to] of [
  ['/#/project/repurposed', '/project/repurposed/'],
  ['/#/cv', '/cv/'],
  ['/#/cv-max', '/cv-max/'],
  ['/#/projects?k=solo', '/projects/?k=solo'],
  ['/#/main', '/']
]) {
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
report('4', redirectProblems.length === 0, redirectProblems.join('; ') || '/#/project/repurposed, /#/cv, /#/cv-max, /#/projects?k=, /#/main redirect; unknown path -> 404 page');

// --- criterion 5: a pdf per cv variant ---
const CV_ROUTES = ['cv', 'cv-longer', 'cv-max', 'cv-product-designer', 'cv-living-lab-hil'];
const pdfDetails = [];
let pdfOk = true;
for (const cv of CV_ROUTES) {
  const pdfPath = join(buildDir, cv, `${cv}.pdf`);
  if (!existsSync(pdfPath)) {
    pdfOk = false;
    pdfDetails.push(`${cv}: build/${cv}/${cv}.pdf missing`);
    continue;
  }
  const raw = readFileSync(pdfPath, 'latin1');
  const boxes = [...raw.matchAll(/\/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)\s*\]/g)].map((m) => [Math.round(m[1]), Math.round(m[2])]);
  // A4 is 595.3 x 841.9pt, chromium rounds the page to whole css pixels
  const a4 = boxes.length > 0 && boxes.every(([w, h]) => Math.abs(w - 595) <= 1.5 && Math.abs(h - 842) <= 1.5);
  const text = execFileSync('pdftotext', [pdfPath, '-'], { encoding: 'utf8' });
  const hasText = text.includes('Jonas Ward') && text.includes('Van den Bulcke') && text.includes('jonas@jonasward.ch');
  const ownFooter = text.includes(`jonasward.ch/${cv}\n`) || text.trimEnd().endsWith(`jonasward.ch/${cv}`);
  const href = await visit(`${P}/${cv}/`, (page) => page.getAttribute('.cv-download', 'href'));
  const pdfResponse = await fetch(new URL(href, P));
  const ok = a4 && hasText && ownFooter && href === `/${cv}/${cv}.pdf` && pdfResponse.ok;
  pdfOk &&= ok;
  pdfDetails.push(
    `${cv}: ${boxes.length}p ${a4 ? 'A4' : `not A4 ${JSON.stringify(boxes)}`}${hasText ? '' : ', name/email missing'}${ownFooter ? '' : ', footer route wrong'}, href ${href} -> ${pdfResponse.status}`
  );
}
report('5', pdfOk, pdfDetails.join('; '));

// --- criterion 9: every link to this site lands where it should ---
// from the source (data, cv content), from every built page, and the urls in the printed cvs' qr codes
// (decoded once from src/assets/cv*.png). Old hash routes have to arrive on their page, anchors have to stay anchors
const QR_URLS = ['cv', 'cv-longer', 'cv-max', 'cv-product-designer', 'cv-living-lab-hil'].map((cv) => `jonasward.ch/#${cv}`);
const OTHER_SITES = /^\/(clay-online|lucerna-lecto|svg-sdf|densing-ui)(\/|$)/; // other repos on the same domain
const LANDS_ON_404 = ['/portfolio/', '/landing/']; // the old site showed its 404 page there too
const links = new Map(); // site-relative link -> where it was found
const addLink = (raw, where) => {
  const own = raw.match(/^(?:https?:\/\/)?(?:www\.)?jonasward\.ch(\/.*)?$/);
  const link = own ? own[1] || '/' : raw;
  if (!/^[/#]/.test(link) || link.startsWith('//') || OTHER_SITES.test(link)) return;
  if (!links.has(link)) links.set(link, where);
};
for (const file of walk(join(root, 'src/data')).filter((f) => f.endsWith('.ts')))
  // jonasward.ch urls, `#/route` and `#segment/...` strings; not keys like '#c' (C#), not template strings
  for (const [, raw] of readFileSync(file, 'utf8').matchAll(/['"`]((?:https?:\/\/)?(?:www\.)?jonasward\.ch[^'"`\s]*|#\/[^'"`\s]*|#[a-z-]+\/[^'"`\s]*)['"`]/g))
    if (!raw.includes('${')) addLink(raw, file.slice(root.length));
for (const file of walk(buildDir).filter((f) => f.endsWith('.html')))
  for (const [, raw] of readFileSync(file, 'utf8').matchAll(/href="([^"]+)"/g)) addLink(raw, file.slice(buildDir.length));
QR_URLS.forEach((url) => addLink(url, 'qr code'));
links.set('/cv/#education', 'in-page anchor');

const linkRows = [];
const linkProblems = [];
for (const [link, where] of links) {
  // a link with only a hash is opened from the landing page, like a printed `jonasward.ch/#cv`
  const from = link.startsWith('#') ? `/${link}` : link;
  if (/\.\w+$/.test(new URL(from, P).pathname)) {
    const res = await fetch(new URL(from, P));
    linkRows.push([link, `file ${res.status}`]);
    if (!res.ok) linkProblems.push(`${link} (${where}) -> ${res.status}`);
    continue;
  }
  const route = from.replace(/^\/#\/?/, '/');
  const anchor = from.includes('#') && !/^\/#/.test(from);
  await visit(`${P}${from}`, async (page) => {
    if (/^\/#/.test(from) && route !== '/' && route !== '/main')
      await page.waitForURL((u) => u.pathname !== '/' || !u.hash, { timeout: 5000 }).catch(() => {});
    const u = new URL(page.url());
    const landed = u.pathname + u.search + u.hash;
    const isMissing = (await page.textContent('body')).includes('wrong turn');
    linkRows.push([link, landed + (isMissing ? ' (404 page)' : '')]);
    const expectLanding = route === '/' || /^\/main\/?$/.test(route);
    const expect404 = LANDS_ON_404.includes(u.pathname);
    if (anchor && landed !== from) linkProblems.push(`${link} anchor moved to ${landed}`);
    else if (!expectLanding && u.pathname === '/') linkProblems.push(`${link} (${where}) stayed on the landing page`);
    else if (isMissing && !expect404) linkProblems.push(`${link} (${where}) -> 404 page at ${landed}`);
  });
}
if (args.has('--links')) linkRows.forEach(([link, landed]) => console.log(`  ${link.padEnd(42)} -> ${landed}`));
report('9', linkProblems.length === 0, `${links.size} links to this site${linkProblems.length ? `; ${linkProblems.join(' || ')}` : ' all land on their page'}`);

// --- criterion 7: data untouched ---
const dataDiff = execSync('git status --porcelain -- src/data', { cwd: root, encoding: 'utf8' }).trim();
report('7', dataDiff === '', dataDiff || 'git status src/data: clean');

// --- criterion 8: screenshots to look at ---
if (!args.has('--no-shots')) {
  mkdirSync(shotsDir, { recursive: true });
  const pages = [
    ['project-digitale-augen', '/project/digitale-augen/'],
    ['project-chocolade-chaud', '/project/chocolade-chaud/'],
    ['project-anitkabir', '/project/anitkabir/'],
    ['project-sdf-svg', '/project/sdf-svg/'],
    ['projects', '/projects/'],
    ['about', '/about/'],
    ['cv', '/cv/']
  ];
  const shots = [];
  for (const [viewportName, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: viewportName === 'mobile', hasTouch: viewportName === 'mobile' });
    for (const [name, path] of pages) {
      const page = await ctx.newPage();
      await page.goto(P + path, { waitUntil: 'networkidle' });
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
      const file = join(shotsDir, `${name}-${viewportName}.png`);
      await page.screenshot({ path: file, fullPage: true });
      await page.screenshot({ path: file.replace('.png', '-top.png') });
      shots.push(file);
      await page.close();
    }
    await ctx.close();
  }
  report('8', shots.length === pages.length * 2, `${shots.length} full-page screenshots (+ "-top" viewport crops) in test/screenshots/; compare by eye`);
}

await browser.close();
await server.stop();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed${failed.length ? `, failed: ${failed.map((f) => f.id).join(', ')}` : ''}`);
process.exit(failed.length ? 1 : 0);
