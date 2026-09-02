import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const d = await page.evaluate(() => {
  const de = document.documentElement;
  const out = { innerWidth: window.innerWidth, scrollWidth: de.scrollWidth, bodyScrollW: document.body.scrollWidth, wide: [] };
  for (const el of document.querySelectorAll('html *')) {
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth + 1 || r.left < -1) {
      out.wide.push(`${el.tagName}.${String(el.className).split(' ')[0]} L=${Math.round(r.left)} R=${Math.round(r.right)}`);
    }
  }
  return out;
});
console.log(JSON.stringify(d, null, 1));
await browser.close();
