// Renders the logo SVG and writes a signed distance field of it as a PNG.
//
// The PNG stores, per pixel, the signed distance to the logo's outline in
// texture pixels, mapped so that 0.5 is the outline, 0 is `spread` pixels
// inside and 1 is `spread` pixels outside. The landing shader samples it to
// cut the logo into the paper wall.
//
// usage: node scripts/generateLogoSdf.mjs   (needs playwright with chromium)

import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const { chromium } = createRequire(import.meta.url)('playwright');

const WIDTH = 1024;
const SPREAD = 48;
const svgPath = resolve('src/assets/icons/jonasward_logo_ww.svg');
const outPath = resolve('src/assets/icons/jonasward_logo_sdf.png');

const svg = readFileSync(svgPath, 'utf8');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--no-sandbox']
});
const page = await browser.newPage();
const dataUrl = await page.evaluate(
  async ({ svg, width, spread }) => {
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    await img.decode();
    const height = Math.round((width * img.naturalHeight) / img.naturalWidth);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    const alpha = ctx.getImageData(0, 0, width, height).data;
    const inside = new Uint8Array(width * height);
    for (let i = 0; i < inside.length; i++) inside[i] = alpha[i * 4 + 3] > 127 ? 1 : 0;

    // Felzenszwalb & Huttenlocher squared euclidean distance transform, separable
    const INF = 1e20;
    const edt1d = (f, n, d, v, z) => {
      let k = 0;
      v[0] = 0;
      z[0] = -INF;
      z[1] = INF;
      for (let q = 1; q < n; q++) {
        let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (s <= z[k]) {
          k--;
          s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        }
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = INF;
      }
      k = 0;
      for (let q = 0; q < n; q++) {
        while (z[k + 1] < q) k++;
        d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
      }
    };
    const edt2d = (mask) => {
      const grid = new Float64Array(width * height);
      for (let i = 0; i < grid.length; i++) grid[i] = mask[i] ? 0 : INF;
      const n = Math.max(width, height);
      const f = new Float64Array(n);
      const d = new Float64Array(n);
      const v = new Int32Array(n);
      const z = new Float64Array(n + 1);
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) f[y] = grid[y * width + x];
        edt1d(f, height, d, v, z);
        for (let y = 0; y < height; y++) grid[y * width + x] = d[y];
      }
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) f[x] = grid[y * width + x];
        edt1d(f, width, d, v, z);
        for (let x = 0; x < width; x++) grid[y * width + x] = d[x];
      }
      return grid;
    };
    const outsideMask = new Uint8Array(inside.length);
    for (let i = 0; i < inside.length; i++) outsideMask[i] = 1 - inside[i];
    const toInside = edt2d(inside); // distance from outside points to the logo
    const toOutside = edt2d(outsideMask); // distance from inside points to the edge

    const out = ctx.createImageData(width, height);
    for (let i = 0; i < inside.length; i++) {
      const dist = inside[i] ? -Math.sqrt(toOutside[i]) : Math.sqrt(toInside[i]);
      const v = Math.round(Math.min(Math.max(0.5 + dist / (2 * spread), 0), 1) * 255);
      out.data[i * 4] = v;
      out.data[i * 4 + 1] = v;
      out.data[i * 4 + 2] = v;
      out.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
    return canvas.toDataURL('image/png');
  },
  { svg, width: WIDTH, spread: SPREAD }
);
await browser.close();
writeFileSync(outPath, Buffer.from(dataUrl.split(',')[1], 'base64'));
console.log(`wrote ${outPath} (${WIDTH} px wide, spread ${SPREAD} px)`);
