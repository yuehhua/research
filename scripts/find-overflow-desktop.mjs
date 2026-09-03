import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const culprits = await page.evaluate((vw) => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 1) out.push(`${el.tagName}.${String(el.className).split(' ')[0]} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
  }
  return out.slice(0, 8);
}, 1920);
console.log(culprits.join('\n') || 'none');
await browser.close();
