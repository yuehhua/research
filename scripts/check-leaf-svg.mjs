import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const d = await page.evaluate(() => {
  const img = document.querySelector('.leaf-photo');
  const r = img.getBoundingClientRect();
  return { loaded: img.complete && img.naturalWidth > 0, src: img.getAttribute('src'), w: Math.round(r.width), right: Math.round(r.right), bottom: Math.round(r.bottom) };
});
console.log(JSON.stringify(d));
await page.screenshot({ path: '/tmp/hero-leaf-svg.png' });
await browser.close();
