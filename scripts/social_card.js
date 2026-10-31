// Renders docs/assets/social-card.png, the 1200x630 image shown when a
// link to the site is shared (Instagram DMs, WhatsApp, Telegram, ...).
// Run from the repo root after changing the logo or the description:
//   node scripts/social_card.js
const fs = require("fs");
const { chromium } = require("playwright");

const logo = fs.readFileSync("docs/assets/icons/logo.svg", "utf8");
const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500&family=Inter:wght@400&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; background: #141413; }
  body { display: flex; flex-direction: column; justify-content: center; padding: 0 110px; box-sizing: border-box; }
  .logo svg { width: 150px; height: auto; display: block; }
  h1 { margin: 56px 0 18px; font: 500 112px/1 "Source Serif 4", Georgia, serif; letter-spacing: -0.02em; color: #faf9f5; }
  p { margin: 0; font: 400 40px/1.3 Inter, sans-serif; color: #faf9f58f; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: #d97757; }
</style></head><body>
  <div class="logo">${logo}</div>
  <h1>nx-wiki</h1>
  <p>nx knowledge base</p>
  <div class="bar"></div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "docs/assets/social-card.png" });
  await browser.close();
})();
