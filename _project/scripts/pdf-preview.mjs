import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = 'C:/Users/cuney/OneDrive/Desktop/Claude/Ohh%20La%20la/temporary%20screenshots/Menu/ohlala_menu-3.pdf';
const out = 'C:/Users/cuney/OneDrive/Desktop/Claude/Ohh La la/temporary screenshots/Menu';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

// Page 1 - top section
await page.goto(`file:///${pdfPath}#zoom=150`, { waitUntil: 'networkidle0', timeout: 20000 });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: out + '/pdf-p1-top.png' });

// Page 1 - middle section
await page.evaluate(() => window.scrollBy(0, 700));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: out + '/pdf-p1-mid.png' });

// Page 1 - bottom section
await page.evaluate(() => window.scrollBy(0, 700));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: out + '/pdf-p1-bot.png' });

// Page 2
await page.goto(`file:///${pdfPath}#page=2&zoom=150`, { waitUntil: 'networkidle0', timeout: 20000 });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: out + '/pdf-p2-top.png' });

await page.evaluate(() => window.scrollBy(0, 700));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: out + '/pdf-p2-mid.png' });

await browser.close();
console.log('PDF screenshots done');
