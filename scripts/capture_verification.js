import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\atend\\.gemini\\antigravity-ide\\brain\\361bdf5a-ad6e-4217-918a-297cad6fd4f5';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/about.html', name: 'about' },
  { path: '/events.html', name: 'events' },
  { path: '/people.html', name: 'people' },
  { path: '/join.html', name: 'join' }
];

async function capture() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  console.log('Testing interactive drawer on Mobile (375px)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2
  });
  const mPage = await mobileContext.newPage();
  await mPage.goto('http://localhost:5173/');
  await mPage.waitForTimeout(500);

  // Check initial state of toggle button
  const toggleBtn = mPage.locator('#mobile-toggle-btn');
  const initialExpanded = await toggleBtn.getAttribute('aria-expanded');
  console.log(`Mobile toggle initial aria-expanded: ${initialExpanded}`);

  // Click toggle button to open drawer
  await toggleBtn.click();
  await mPage.waitForTimeout(400);
  const openExpanded = await toggleBtn.getAttribute('aria-expanded');
  const hasNavOpen = await mPage.evaluate(() => document.body.classList.contains('nav-open'));
  console.log(`Mobile toggle after click aria-expanded: ${openExpanded}, body.nav-open: ${hasNavOpen}`);

  // Screenshot drawer open
  await mPage.screenshot({
    path: path.join(ARTIFACT_DIR, 'drawer_open_375px.png'),
    fullPage: false
  });
  console.log('Saved drawer_open_375px.png');

  // Press Escape to test keyboard closing
  await mPage.keyboard.press('Escape');
  await mPage.waitForTimeout(400);
  const closedExpanded = await toggleBtn.getAttribute('aria-expanded');
  const closedNavOpen = await mPage.evaluate(() => document.body.classList.contains('nav-open'));
  console.log(`Mobile toggle after Escape aria-expanded: ${closedExpanded}, body.nav-open: ${closedNavOpen}`);

  // Capture Mobile and Desktop screenshots for each page
  for (const p of PAGES) {
    console.log(`Capturing ${p.name}...`);

    // Mobile 375px
    await mPage.goto(`http://localhost:5173${p.path}`);
    await mPage.waitForTimeout(300);
    // Scroll down to trigger ScrollTrigger reveals
    await mPage.evaluate(async () => {
      const scrollStep = 500;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, scrollStep);
        await new Promise((r) => setTimeout(r, 60));
      }
      await new Promise((r) => setTimeout(r, 200));
      window.scrollTo(0, 0);
    });
    await mPage.waitForTimeout(400);
    await mPage.screenshot({
      path: path.join(ARTIFACT_DIR, `verified_${p.name}_mobile_375.png`),
      fullPage: true
    });

    // Desktop 1280px
    const dContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1
    });
    const dPage = await dContext.newPage();
    await dPage.goto(`http://localhost:5173${p.path}`);
    await dPage.waitForTimeout(300);
    await dPage.evaluate(async () => {
      const scrollStep = 500;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, scrollStep);
        await new Promise((r) => setTimeout(r, 60));
      }
      await new Promise((r) => setTimeout(r, 200));
      window.scrollTo(0, 0);
    });
    await dPage.waitForTimeout(400);
    await dPage.screenshot({
      path: path.join(ARTIFACT_DIR, `verified_${p.name}_desktop_1280.png`),
      fullPage: true
    });
    await dContext.close();
  }

  await mobileContext.close();
  await browser.close();
  console.log('All verification captures completed successfully!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
