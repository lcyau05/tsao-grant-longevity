import { chromium } from "playwright";

console.log("Before launch");

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

console.log("After launch");

await browser.close();
console.log("Done");
