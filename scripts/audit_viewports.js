import { chromium } from 'playwright';

const VIEWPORTS = [
  { width: 320, height: 568, name: '320px (iPhone SE 1st gen)' },
  { width: 360, height: 640, name: '360px (Galaxy S8 / small Android)' },
  { width: 375, height: 667, name: '375px (iPhone SE 2nd / iPhone 8)' },
  { width: 390, height: 844, name: '390px (iPhone 12/13/14)' },
  { width: 414, height: 896, name: '414px (iPhone XR / 11)' },
  { width: 430, height: 932, name: '430px (iPhone 14/15 Pro Max)' },
  { width: 768, height: 1024, name: '768px (iPad Mini / Portrait)' },
  { width: 1024, height: 768, name: '1024px (iPad Pro / Small Desktop)' },
  { width: 1280, height: 800, name: '1280px (Standard Desktop)' },
  { width: 1440, height: 900, name: '1440px (Large Desktop)' }
];

const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/about.html', name: 'About' },
  { path: '/events.html', name: 'Events' },
  { path: '/people.html', name: 'People' },
  { path: '/join.html', name: 'Join' }
];

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runAudit() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  const results = [];

  for (const pageInfo of PAGES) {
    console.log(`\n========================================`);
    console.log(`AUDITING PAGE: ${pageInfo.name} (${pageInfo.path})`);
    console.log(`========================================`);

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1
      });
      const page = await context.newPage();

      const consoleErrors = [];
      const failedRequests = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('requestfailed', (req) => {
        failedRequests.push(`${req.url()} (${req.failure()?.errorText || 'failed'})`);
      });

      try {
        const res = await page.goto(`http://localhost:5173${pageInfo.path}`, {
          waitUntil: 'networkidle',
          timeout: 15000
        });

        // Wait a little for any animations/resizes
        await page.waitForTimeout(300);

        // Check horizontal overflow
        const overflowData = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const winWidth = window.innerWidth;
          const docScrollWidth = docEl.scrollWidth;
          const bodyScrollWidth = body.scrollWidth;

          // Find specific elements overflowing the window
          const overflowingElements = [];
          const all = document.querySelectorAll('*');
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            // Check if element rect extends past right edge by more than 1px
            if (rect.right > winWidth + 1) {
              overflowingElements.push({
                tag: el.tagName.toLowerCase(),
                id: el.id || null,
                className: el.className ? String(el.className).slice(0, 60) : null,
                rectRight: Math.round(rect.right),
                rectWidth: Math.round(rect.width),
                winWidth: winWidth,
                outerHTML: el.outerHTML ? el.outerHTML.slice(0, 100) : ''
              });
            }
          }

          // Check broken images
          const brokenImages = [];
          document.querySelectorAll('img').forEach((img) => {
            if (!img.naturalWidth && !img.complete) {
              brokenImages.push(img.src);
            }
          });

          return {
            winWidth,
            docScrollWidth,
            bodyScrollWidth,
            hasDocOverflow: docScrollWidth > winWidth,
            hasBodyOverflow: bodyScrollWidth > winWidth,
            overflowingElements: overflowingElements.slice(0, 5), // top 5
            totalOverflowingElements: overflowingElements.length,
            brokenImages
          };
        });

        const status = {
          page: pageInfo.name,
          path: pageInfo.path,
          viewport: vp.name,
          width: vp.width,
          hasOverflow: overflowData.hasDocOverflow || overflowData.hasBodyOverflow || overflowData.totalOverflowingElements > 0,
          docScrollWidth: overflowData.docScrollWidth,
          bodyScrollWidth: overflowData.bodyScrollWidth,
          overflowCount: overflowData.totalOverflowingElements,
          overflowExamples: overflowData.overflowingElements,
          consoleErrors,
          failedRequests,
          brokenImages: overflowData.brokenImages
        };

        results.push(status);

        if (status.hasOverflow) {
          console.log(`❌ [OVERFLOW] ${pageInfo.name} @ ${vp.width}px: scrollWidth=${overflowData.docScrollWidth} > innerWidth=${vp.width}. Overflowing elements: ${overflowData.totalOverflowingElements}`);
          overflowData.overflowingElements.forEach((el, idx) => {
            console.log(`    #${idx+1}: <${el.tag} class="${el.className}"> right=${el.rectRight}px (viewport=${vp.width}px)`);
          });
        } else {
          console.log(`✅ [OK] ${pageInfo.name} @ ${vp.width}px: scrollWidth=${overflowData.docScrollWidth} == innerWidth=${vp.width}`);
        }

        if (consoleErrors.length > 0) {
          console.log(`   ⚠️ Console Errors:`, consoleErrors);
        }
        if (failedRequests.length > 0) {
          console.log(`   ⚠️ Failed Requests:`, failedRequests);
        }
      } catch (err) {
        console.error(`💥 Error testing ${pageInfo.name} @ ${vp.width}px:`, err.message);
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`AUDIT COMPLETE. TOTAL RUNS: ${results.length}`);
  console.log(`OVERFLOW FAILURES: ${results.filter(r => r.hasOverflow).length}`);
  console.log(`CONSOLE ERRORS: ${results.filter(r => r.consoleErrors.length > 0).length}`);
  console.log(`FAILED REQUESTS: ${results.filter(r => r.failedRequests.length > 0).length}`);
  console.log(`========================================\n`);
}

runAudit();
