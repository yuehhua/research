import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const culprits = await page.evaluate(() => {
  const out = [];
  const els = [...document.querySelectorAll('body, body *')];
  for (const el of els) {
    const prev = el.style.display;
    el.style.display = 'none';
    if (document.documentElement.scrollWidth === 390) {
      out.push(`${el.tagName}.${String(el.className).split(' ')[0]}`);
    }
    el.style.display = prev;
  }
  return out.slice(0, 6);
});
console.log(culprits.length ? culprits.join('\n') : 'none found');
await browser.close();
