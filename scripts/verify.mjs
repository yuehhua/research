/**
 * verify.mjs — Stage 4 automated verification.
 * Captures every slide at desktop / tablet / mobile widths in both languages,
 * and reports console errors along the way.
 *
 * Usage: node scripts/verify.mjs   (expects `npm run preview` on :4321)
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4321/research';
const SLIDES = ['hero', 'about', 'research', 'projects', 'publications', 'teaching', 'join'];
const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const OUT = '/tmp/isbshots';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});

let errors = 0;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  const consoleErrs = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrs.push(m.text());
  });
  page.on('pageerror', (e) => consoleErrs.push(String(e)));

  for (const lang of ['zh', 'en']) {
    const path = lang === 'zh' ? `${BASE}/` : `${BASE}/en/`;
    await page.goto(path, { waitUntil: 'networkidle0' });

    for (const slide of SLIDES) {
      await page.evaluate((id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, slide);
      await new Promise((r) => setTimeout(r, 250));
      const file = `${OUT}/${vp.name}-${lang}-${slide}.png`;
      await page.screenshot({ path: file });
    }

    if (consoleErrs.length) {
      errors++;
      console.log(`CONSOLE ERRORS [${vp.name}/${lang}]:`, consoleErrs.slice(0, 5));
    }
  }
  await page.close();
}

await browser.close();
console.log(errors === 0 ? '✔ no console errors' : `✘ ${errors} page(s) with console errors`);
console.log('screenshots →', OUT);
