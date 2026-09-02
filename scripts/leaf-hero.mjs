import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
const d = await page.evaluate(() => {
  const main = document.querySelector('.leaf--main').getBoundingClientRect();
  return { mainRight: Math.round(main.right), mainBottom: Math.round(main.bottom), vw: innerWidth, vh: innerHeight };
});
console.log('leaf bbox:', JSON.stringify(d));
await browser.close();
