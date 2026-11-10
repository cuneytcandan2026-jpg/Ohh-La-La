import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\Program Files\Google\Chrome\Application\chrome.exe',
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

const info = await page.evaluate(() => {
  const hero = document.getElementById('hero');
  const siteNav = document.getElementById('site-nav');
  const main = document.querySelector('main');
  const heroImg = hero?.querySelector('img');
  const heroSection = hero?.getBoundingClientRect();
  const navRect = siteNav?.getBoundingClientRect();
  const mainRect = main?.getBoundingClientRect();
  const imgRect = heroImg?.getBoundingClientRect();
  
  const heroStyle = window.getComputedStyle(hero);
  const mainStyle = window.getComputedStyle(main);
  
  return {
    hero: {
      top: heroSection?.top,
      height: heroSection?.height,
      paddingTop: heroStyle.paddingTop,
      marginTop: heroStyle.marginTop,
    },
    nav: {
      top: navRect?.top,
      height: navRect?.height,
    },
    main: {
      top: mainRect?.top,
      paddingTop: mainStyle.paddingTop,
      marginTop: mainStyle.marginTop,
    },
    img: {
      top: imgRect?.top,
      height: imgRect?.height,
    },
    viewportHeight: window.innerHeight,
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
