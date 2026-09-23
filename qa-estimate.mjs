import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  const results = {
    initialLoad: false,
    step1Passed: false,
    step2Passed: false,
    step3Passed: false,
    estimateTotal: null,
    breakdownLength: 0,
    consoleErrors: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('404')) results.consoleErrors.push(text);
    }
  });

  page.on('pageerror', error => {
    results.consoleErrors.push(error.message);
  });

  try {
    // 1. Initial Load
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/estimate', { waitUntil: 'networkidle0' });
    
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    results.initialLoad = title.includes('Project Estimate');

    // 2. Select Property (Full Home)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[role="radio"]'));
      const fh = btns.find(b => b.textContent === 'Full Home');
      if (fh) fh.click();
    });
    
    // Wait for auto-advance (300ms + framer motion)
    await new Promise(r => setTimeout(r, 800));

    // 3. Select Size (3 BHK)
    const sizeVisible = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return h2 && h2.textContent.includes('size of your home');
    });
    results.step1Passed = sizeVisible;

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[role="radio"]'));
      const bhk3 = btns.find(b => b.textContent === '3 BHK');
      if (bhk3) bhk3.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // 4. Select Finish (Premium)
    const finishVisible = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return h2 && h2.textContent.includes('finish level');
    });
    results.step2Passed = finishVisible;

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[role="radio"]'));
      const premium = btns.find(b => b.textContent.includes('Premium'));
      if (premium) premium.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // 5. Add-ons
    const addonsVisible = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return h2 && h2.textContent.includes('optional additions');
    });
    results.step3Passed = addonsVisible;

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[role="checkbox"]'));
      const tv = btns.find(b => b.textContent.includes('TV Unit'));
      if (tv) tv.click();
      
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Continue'));
      if (continueBtn) continueBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // 6. Check Estimate Result
    const estimateTotal = await page.evaluate(() => {
      const summary = document.querySelector('.sticky');
      if (!summary) return null;
      // Get the large text element that has ₹
      const divs = Array.from(summary.querySelectorAll('div'));
      const totalDiv = divs.find(d => d.textContent.includes('₹') && d.textContent.includes('L'));
      return totalDiv ? totalDiv.textContent.trim() : null;
    });
    results.estimateTotal = estimateTotal;

    const breakdownLength = await page.evaluate(() => {
      const sticky = document.querySelector('.sticky');
      if (!sticky) return 0;
      // The breakdown rows have flex and border-b
      const rows = sticky.querySelectorAll('.border-b');
      return rows.length;
    });
    results.breakdownLength = breakdownLength;

  } catch (err) {
    results.error = err.message;
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
