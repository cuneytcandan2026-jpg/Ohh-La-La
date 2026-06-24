import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT_DIR = 'c:/Users/cuney/OneDrive/Desktop/Claude/Ohh La la/temporary screenshots';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

// Click hamburger button
await page.waitForSelector('#nav-toggle', { visible: true });
await page.click('#nav-toggle');
await new Promise(r => setTimeout(r, 800));

const file = path.join(OUT_DIR, 'screenshot-menu-open.png');
await page.screenshot({ path: file, fullPage: false });
console.log('Saved:', file);
await browser.close();
