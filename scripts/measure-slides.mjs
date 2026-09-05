/**
 * measure-slides.mjs — per-element height breakdown for tall slides (desktop).
 */
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/lab/', { waitUntil: 'networkidle0' });

const data = await page.evaluate(() => {
  const out = {};
  for (const id of ['about', 'research', 'teaching']) {
    const slide = document.getElementById(id);
    out[id] = { h: slide.offsetHeight, children: [] };
    for (const sel of ['.slide__eyebrow', '.slide__title', '.about-grid', '.portrait', '.bio', '.about-timeline', '.interest-grid', '.interest', '.focus', '.projects', '.project', '.pubs', '.course-grid', '.course', '.teaching-past']) {
      const els = slide.querySelectorAll(sel);
      els.forEach((el) => {
        out[id].children.push(`${sel} → ${Math.round(el.getBoundingClientRect().height)}px`);
      });
    }
    const cs = getComputedStyle(slide);
    out[id].children.push(`[slide padding-top ${cs.paddingTop}, padding-bottom ${cs.paddingBottom}]`);
  }
  return out;
});
console.log(JSON.stringify(data, null, 1));
await browser.close();
