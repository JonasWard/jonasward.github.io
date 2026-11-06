// app icons for the web manifest: the "JO" of the wordmark on white, rendered from the svg so every size is sharp
// run once after the logo changes: node scripts/generateIcons.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const logo = fileURLToPath(new URL('../src/assets/icons/jonasward_logo_ww.svg', import.meta.url));
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

for (const size of [192, 512]) {
  const pad = Math.round(size * 0.12);
  const inner = size - 2 * pad;
  // render the svg large, scale its height to the inner square, then keep the left square
  const rendered = await sharp(await sharp(logo, { density: 600 }).png().toBuffer())
    .resize({ height: inner })
    .png()
    .toBuffer({ resolveWithObject: true });
  const crop = await sharp(rendered.data)
    .extract({ left: 0, top: 0, width: Math.min(inner, rendered.info.width), height: Math.min(inner, rendered.info.height) })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: crop, left: pad, top: pad }])
    .png()
    .toFile(out(`icon-${size}.png`));
  console.log(`public/icon-${size}.png`);
}
