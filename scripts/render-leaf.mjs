// Rasterize the generated leaf SVG with Chrome (correct SVG rendering) for inspection
import puppeteer from 'puppeteer-core';
import { readFileSync } from 'node:fs';
const svg = readFileSync('/tmp/leaf.svg', 'utf8');
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 400, height: 400, deviceScaleFactor: 2 });
await page.setContent(`<body style="margin:0;background:#fff">${svg.replace('viewBox="0 0 200 200"', 'viewBox="0 0 200 200" width="400" height="400"')}</body>`);
await page.screenshot({ path: '/tmp/leaf.png' });
await browser.close();
console.log('rendered /tmp/leaf.png');
