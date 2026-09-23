import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  const results = {
    designsDesktop: {},
    designsMobile: {},
    roomsDesktop: {},
    stylesDesktop: {},
    workMobile: {},
    workSlugDesktop: {},
    consoleErrors: []
  };

  page.on('response', response => {
    if (response.status() === 404) {
      results.consoleErrors.push(`404: ${response.url()}`);
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('404')) {
        results.consoleErrors.push(`Console: ${text}`);
      }
    }
  });

  page.on('pageerror', error => {
    results.consoleErrors.push(error.message);
  });

  try {
    // 1. /designs Desktop (1440px)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/designs', { waitUntil: 'networkidle0' });
    
    // Check if chips exist instead of select
    const filters = await page.$$eval('button', buttons => buttons.map(b => b.textContent).join(', '));
    results.designsDesktop.chipsPresent = filters.includes('Kitchen') || filters.includes('Living Room');
    
    // Click a filter and check URL
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const kitchenBtn = btns.find(b => b.textContent === 'Kitchen');
      if (kitchenBtn) kitchenBtn.click();
    });
    await new Promise(r => setTimeout(r, 500)); // wait for state/url update
    results.designsDesktop.urlUpdates = page.url().includes('room=Kitchen');

    // 2. /designs Mobile (375px)
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:3000/designs', { waitUntil: 'networkidle0' });
    
    const filterBtnVisible = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Filters & Search'));
      return btn && btn.offsetParent !== null;
    });
    results.designsMobile.filterBtnVisible = filterBtnVisible;

    if (filterBtnVisible) {
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Filters & Search'));
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 500)); // Wait for bottom sheet animation
      
      const bottomSheetVisible = await page.evaluate(() => {
        return !!document.querySelector('[role="dialog"]');
      });
      results.designsMobile.bottomSheetVisible = bottomSheetVisible;
      
      const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      results.designsMobile.bodyScrollLocked = bodyOverflow === 'hidden';

      // Test Escape
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 500));
      const bottomSheetVisibleAfterEsc = await page.evaluate(() => {
        return !!document.querySelector('[role="dialog"]');
      });
      results.designsMobile.escapeWorks = !bottomSheetVisibleAfterEsc;
    }

    // 3. /rooms Desktop (1280px)
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/rooms', { waitUntil: 'networkidle0' });
    
    const heroHeight = await page.evaluate(() => {
      const hero = document.querySelector('main > div:first-child');
      return hero ? hero.offsetHeight : 0;
    });
    // min-h-[40vh] on 800px is 320px, plus padding might be larger. We expect around 320-500px, not 800px.
    results.roomsDesktop.heroHeight = heroHeight;

    // 4. /styles Desktop
    await page.goto('http://localhost:3000/styles', { waitUntil: 'networkidle0' });
    const stylesHeroHeight = await page.evaluate(() => {
      const hero = document.querySelector('main > div:first-child');
      return hero ? hero.offsetHeight : 0;
    });
    results.stylesDesktop.heroHeight = stylesHeroHeight;

    // 5. /work Mobile (375px)
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:3000/work', { waitUntil: 'networkidle0' });
    
    const projectCardTextSize = await page.evaluate(() => {
      const h3 = document.querySelector('h3');
      if (!h3) return null;
      return window.getComputedStyle(h3).fontSize;
    });
    // Expected to be 20px (text-xl) not the huge --text-h3 size
    results.workMobile.h3FontSize = projectCardTextSize;

    // 6. /work/[slug] Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/work/oak-timber-house', { waitUntil: 'networkidle0' });
    
    const relatedServicesText = await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      const related = h2s.find(h => h.textContent.includes('Related Services'));
      if (!related) return null;
      // Get the title of the related service next to it
      const h3 = related.parentElement.parentElement.parentElement.querySelector('h3');
      return h3 ? h3.textContent : 'Found but no title';
    });
    results.workSlugDesktop.relatedServices = relatedServicesText;

  } catch (err) {
    results.error = err.message;
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
