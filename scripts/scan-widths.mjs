import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const widths = [1440, 1280, 1024, 900, 600, 480, 360];
let bad = 0;
for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: Math.round(w * 0.6) });
  for (const path of ['/research/', '/research/en/']) {
    await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle0' });
    const overflow = await page.evaluate((vw) => document.documentElement.scrollWidth > vw + 1, w);
    if (overflow) { bad++; console.log(`✘ ${w}px ${path} horizontal overflow`); }
  }
  await page.close();
}
console.log(bad === 0 ? '✔ all widths clean' : `${bad} overflow`);
await browser.close();
