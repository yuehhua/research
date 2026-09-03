import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const d = await page.evaluate(() => {
  const el = document.getElementById('hero');
  const cs = getComputedStyle(el);
  return {
    bgImage: (cs.backgroundImage || '').slice(0, 120),
    bgColor: cs.backgroundColor,
    cid: el.getAttribute('data-astro-cid'),
    hasClass: el.className,
  };
});
console.log(JSON.stringify(d, null, 1));
await browser.close();
