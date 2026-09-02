import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const culprit = await page.evaluate(() => {
  // hide candidates one at a time; whoever's hiding restores scrollWidth = 390 is the culprit
  const base = document.documentElement.scrollWidth;
  if (base === 390) return 'no overflow';
  const sels = ['.nature', '.site-header', '.dots', '.counter', '.about-timeline', '.pubs', '.hero-byline', '.hero-ctas', '.focus-chips', '.footer-inner', '.site-footer'];
  for (const s of sels) {
    const el = document.querySelector(s);
    if (!el) continue;
    const prev = el.style.display;
    el.style.display = 'none';
    const w = document.documentElement.scrollWidth;
    el.style.display = prev;
    if (w === 390) return s;
  }
  return `still ${base} — unknown`;
});
console.log('culprit:', culprit);
await browser.close();
