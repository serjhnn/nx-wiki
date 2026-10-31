// Generates every logo and icon file from one design: cream NX strokes on a
// clay rounded tile. Run from the repo root after changing the design:
//   node scripts/icons.js && node scripts/social_card.js
//
// Writes:
//   docs/assets/icons/logo.svg, icon.svg, icon-maskable.svg
//   docs/assets/icons/icon-192.png, icon-512.png, icon-maskable-512.png,
//     apple-touch-icon.png
//   app/android/.../mipmap-*/ic_launcher.png, ic_launcher_round.png,
//     ic_launcher_foreground.png (adaptive icon; its background colour is
//     ic_launcher_background in values/ic_launcher_background.xml)
const fs = require("fs");
const { chromium } = require("playwright");

const CLAY = "#d97757";
const CREAM = "#faf9f5";

// The NX lettermark on a 64x64 grid, centred on (32, 32)
const NX = "M14 44V20l12 24V20M34 20l16 24M50 20L34 44";
const strokes = (scale = 1) =>
  `<g transform="translate(32 32) scale(${scale}) translate(-32 -32)" fill="none" stroke="${CREAM}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="${NX}"/></g>`;

const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${body}</svg>\n`;
const tile = svg(`<rect width="64" height="64" rx="15" fill="${CLAY}"/>${strokes()}`);
const square = (scale) => svg(`<rect width="64" height="64" fill="${CLAY}"/>${strokes(scale)}`);
const circle = svg(`<circle cx="32" cy="32" r="32" fill="${CLAY}"/>${strokes(0.9)}`);
// Adaptive icon foreground: 108dp canvas of which ~72dp shows, so the
// letters are drawn at 72/108 of their size on the tile
const foreground = svg(strokes(0.68));
// Maskable icons are cropped to a circle of 80% of the width
const maskable = square(0.85);

const icons = "docs/assets/icons";
fs.writeFileSync(`${icons}/logo.svg`, tile);
fs.writeFileSync(`${icons}/icon.svg`, tile);
fs.writeFileSync(`${icons}/icon-maskable.svg`, maskable);

const res = "app/android/app/src/main/res";
const densities = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const pngs = [
  [`${icons}/icon-192.png`, tile, 192],
  [`${icons}/icon-512.png`, tile, 512],
  [`${icons}/icon-maskable-512.png`, maskable, 512],
  [`${icons}/apple-touch-icon.png`, square(1), 180],
];
for (const [d, k] of Object.entries(densities)) {
  pngs.push([`${res}/mipmap-${d}/ic_launcher.png`, tile, 48 * k]);
  pngs.push([`${res}/mipmap-${d}/ic_launcher_round.png`, circle, 48 * k]);
  pngs.push([`${res}/mipmap-${d}/ic_launcher_foreground.png`, foreground, 108 * k]);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [path, markup, size] of pngs) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${markup}`
    );
    await page.screenshot({ path, omitBackground: true });
  }
  await browser.close();
})();
