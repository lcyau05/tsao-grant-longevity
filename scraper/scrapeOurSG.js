import { chromium } from "playwright";

/**
 * Scrape OurSG Grants "New Grants" page
 * Returns raw text for each grant detail page
 */
export async function scrapeOurSG() {
  // 1. Launch browser
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // 2. Go to OurSG Grants listing page
  await page.goto("https://oursggrants.gov.sg/grants/new", {
    waitUntil: "networkidle",
  });

  // 3. Collect grant detail links
  const links = await page.$$eval("a", anchors =>
    anchors
      .map(a => a.href)
      .filter(href =>
        href.includes("/grants/") &&
        !href.endsWith("/grants/new")
      )
  );

  // Remove duplicates
  const uniqueLinks = [...new Set(links)];

  const results = [];

  // 4. Visit each grant page (LIMIT for safety)
  for (const link of uniqueLinks.slice(0, 5)) {
    const grantPage = await browser.newPage();

    await grantPage.goto(link, {
      waitUntil: "networkidle",
    });

    // 5. Extract visible text
    const rawText = await grantPage.innerText("body");

    results.push({
      url: link,
      rawText,
      scrapedAt: new Date().toISOString(),
    });

    await grantPage.close();
  }

  // 6. Close browser
  await browser.close();

  return results;
}
