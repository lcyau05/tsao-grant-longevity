let chromium;

async function getChromium() {
  if (!chromium) {
    ({ chromium } = await import("playwright"));
  }
  return chromium;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Scrape OurSG Grants instruction pages
 * RETURNS RAW TEXT ONLY
 */
export async function scrapeOurSG() {
  const chromium = await getChromium();
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("https://oursggrants.gov.sg/grants/new", {
    waitUntil: "networkidle",
  });

  const links = await page.$$eval("a", anchors =>
    anchors
      .map(a => a.href)
      .filter(href =>
        href.match(/\/grants\/[a-z0-9-]+\/instruction\/?(\?.*)?$/)
      )
  );

  const uniqueLinks = [...new Set(links)];
  const results = [];

  for (const link of uniqueLinks.slice(0, 3)) { //OurSG Grants only allowed 2 instruction page load. DOS protection. 
    const grantPage = await browser.newPage();
    await grantPage.goto(link, { waitUntil: "networkidle" });

    const rawText = await grantPage.innerText("body");

    results.push({
      url: link,
      rawText,
      scrapedAt: new Date().toISOString(),
    });

    await grantPage.close();
    await sleep(4000); // avoid DOSarrest
  }

  await browser.close();
  return results;
}
