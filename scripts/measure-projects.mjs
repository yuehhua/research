import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const d = await page.evaluate(() => {
  const p = document.querySelector('.project');
  const cs = getComputedStyle(p);
  const cols = cs.gridTemplateColumns.split(' ').map(Number.round ? Number.round : (x) => Math.round(parseFloat(x)));
  const r = p.getBoundingClientRect();
  const slide = document.getElementById('projects');
  const sr = slide.getBoundingClientRect();
  return {
    gridCols: cs.gridTemplateColumns,
    projLeft: Math.round(r.left), projRight: Math.round(r.right),
    slideLeft: Math.round(sr.left), slideRight: Math.round(sr.right),
    leftGap: Math.round(r.left - sr.left), rightGap: Math.round(sr.right - r.right),
  };
});
console.log(JSON.stringify(d, null, 1));
await browser.close();
