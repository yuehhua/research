import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
for (const vp of [{w:768,h:1024},{w:390,h:844}]) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.w, height: vp.h });
  await page.goto('http://localhost:4321/research/', { waitUntil: 'networkidle0' });
  const culprits = await page.evaluate((vw) => {
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > vw + 1) {
        out.push(`${el.tagName}.${String(el.className).split(' ')[0]} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
      }
    }
    return out.slice(0, 12);
  }, vp.w);
  console.log(`--- ${vp.w}px ---`); culprits.forEach(c => console.log(c));
  await page.close();
}
await browser.close();
