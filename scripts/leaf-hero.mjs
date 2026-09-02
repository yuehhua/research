import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const d = await page.evaluate(() => {
  const el = document.querySelector('.leaf-photo');
  if (!el) return 'leaf-photo MISSING';
  const r = el.getBoundingClientRect();
  const loaded = el.complete && el.naturalWidth > 0;
  return `bbox=${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)} loaded=${loaded}`;
});
console.log(d);
await browser.close();
