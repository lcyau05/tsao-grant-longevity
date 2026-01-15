// const puppeteer = require('puppeteer');

// const scrapeData = async() =>{
//     // await puppeteer.createBrowserFetcher(). download(
//     //     puppeteer.PUPPETEER_REVISIONS.chromium
//     // );

//     const browser = await puppeteer.launch({
//         headless: false

//     });

//     const page = await browser.newPage();
//     await page.goto('https://www.aic.sg/partners/community-care-research-grant/', {
//         waitUntil: "domcontentloaded"
//     });


//     const body = await page.evaluate(() => {
//         const imgReference = document.querySelector('#mp-otd #mp-otd-img img');
//         const listReference = document.querySelectorAll('#mp-otd > ul li');

//         let imgSource = imgReference.getAttribute('src');
//         imgSource = imgSource.replace('thumb/', '');
//         let fileExIndex = Math.max(imgSource.indexOf('.jpg/'), imgSource.indexOf('.JPG/'), imgSource.indexOf('.png/'), 
//         imgSource.indexOf('.PNG/'));


//         imgSource = imgSource.substring(0, fileIndex + 4);

//         return imgSource;
//     });

//     browser.close();

//     return body;

// }

// scrapeData().then((res) => {
//     console.log(res);
    
// }
// );

// exports.scrapeData = scrapeData;



// scraper.js
async function scrapeData() {
    // your scraping logic here
    return {
      example: "This is scraped data"
    };
  }
  
  module.exports = { scrapeData };

  
  
// const puppeteer = require('puppeteer');

// const scrapeGrantInfo = async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto('https://www.aic.sg/partners/community-care-research-grant/', {
//         waitUntil: 'domcontentloaded'
//     });

//     // Evaluate page content
//     const grantInfo = await page.evaluate(() => {
//         const about = document.querySelector('#guideline')?.innerText.trim();
//         const howToApply = document.querySelector('.text')?.innerText.trim();
        
//         const docLinks = Array.from(
//             document.querySelectorAll('#template a.text-link')
//         ).map(link => ({
//             name: link.innerText.trim(),
//             url: link.href
//         }));

//         return {
//             about,
//             howToApply,
//             documents: docLinks
//         };
//     });

//     await browser.close();
//     return grantInfo;
// };

// scrapeGrantInfo().then(data => console.log(data));


// exports.scrapeGrantInfo = scrapeGrantInfo;