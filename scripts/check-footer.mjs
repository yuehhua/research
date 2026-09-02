import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
// Jump to the last slide, then one wheel further; let snap settle.
await page.evaluate(() => document.getElementById('join').scrollIntoView({ behavior: 'instant' }));
await page.mouse.wheel({ deltaY: 1600 });
await new Promise(r => setTimeout(r, 1200));
const d = await page.evaluate(() => {
  const f = document.querySelector('.site-footer').getBoundingClientRect();
  return {
    footerTop: Math.round(f.top),
    footerBottom: Math.round(f.bottom),
    vh: window.innerHeight,
    fullyVisible: f.bottom <= window.innerHeight + 1 && f.top >= 0,
    scrolledEnd: window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2,
  };
});
console.log(JSON.stringify(d));
await browser.close();
