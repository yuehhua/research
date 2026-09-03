import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.getElementById('join').scrollIntoView({ behavior: 'instant' }));
await new Promise((r) => setTimeout(r, 600));
const d = await page.evaluate(() => {
  const f = document.querySelector('.site-footer').getBoundingClientRect();
  const s = document.getElementById('join').getBoundingClientRect();
  return {
    footerTop: Math.round(f.top),
    footerBottom: Math.round(f.bottom),
    slideBottom: Math.round(s.bottom),
    vh: window.innerHeight,
    visibleOnJoin: f.bottom <= window.innerHeight + 1 && f.top >= 0,
    insideSlide: Math.abs(f.bottom - s.bottom) <= 2,
  };
});
console.log(JSON.stringify(d));
await browser.close();
