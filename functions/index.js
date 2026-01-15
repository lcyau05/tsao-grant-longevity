/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });




// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

// admin.initializeApp();
// const db = admin.firestore();

// const getToday = () => {
//     const today = new Date();

//     return `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}`;
// };

// exports.pubsub = functions
//     // .region("us-central1")
//     // .runWith({ memory: '2GB'})
//     .pubsub.schedule("0 0 * * *")
//     .timeZone("Europe/Belgrade")
//     .onRun(async () =>{
//         try{
//             const scrapeData = await scraper.scrapeData();
//             await db.collection('days').doc(getToday()).set(scrapeData);
//         } catch (error){
//             throw new Error(error)
//         }
        


//     })



const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
// Ensure your scraper is imported
const scraper = require("./your-scraper-file"); 

admin.initializeApp();
const db = admin.firestore();

const getToday = () => {
    const today = new Date();
    // Returns DDMMYYYY
    return `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}`;
};

// V2 Syntax: Options are passed as the first argument
exports.dailyScraper = onSchedule({
    schedule: "0 0 * * *",
    timeZone: "Europe/Belgrade",
    memory: "2GiB", // V2 uses "GiB" instead of "GB"
    region: "us-central1"
}, async (event) => {
    try {
        const scrapeData = await scraper.scrapeData();
        await db.collection('days').doc(getToday()).set(scrapeData);
        console.log(`Successfully scraped data for ${getToday()}`);
    } catch (error) {
        console.error("Scraper failed:", error);
        // In v2, you don't necessarily need to re-throw unless you want a retry
    }
});
