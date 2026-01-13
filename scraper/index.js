import express from "express";
import { scrapeOurSG } from "./scrapeOurSG.js";

const app = express();

// Health check (important for Cloud Run)
app.get("/", (req, res) => {
  res.send("Grant scraper is running");
});

// Scrape endpoint
app.get("/scrape", async (req, res) => {
  try {
    const data = await scrapeOurSG();
    res.json({
      count: data.length,
      grants: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Scraping failed",
    });
  }
});

// Cloud Run uses PORT env variable
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Scraper listening on port ${PORT}`);
});
