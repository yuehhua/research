import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.getElementById('join').scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 300));
const d = await page.evaluate(() => {
  const c = document.querySelector('.join-content').getBoundingClientRect();
  const f = document.querySelector('.site-footer').getBoundingClientRect();
  const regionBottom = f.top; // content should center between 0 and this
  const cMid = (c.top + c.bottom) / 2;
  return { contentTop: Math.round(c.top), contentBottom: Math.round(c.bottom), footerTop: Math.round(f.top), contentMid: Math.round(cMid), idealMid: Math.round(f.top / 2), offBy: Math.round(cMid - f.top / 2) };
});
console.log(JSON.stringify(d));
await browser.close();
