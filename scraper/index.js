process.on("unhandledRejection", err => {
  console.error("UNHANDLED PROMISE REJECTION:", err);
});

process.on("uncaughtException", err => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

import express from "express";
import { scrapeOurSG } from "./scrapeOurSG.js";
import fs from "fs";

const app = express();

// Health check (important for Cloud Run)
app.get("/", (req, res) => {
  res.send("Grant scraper is running");
});

// Scrape endpoint
app.get("/scrape", async (req, res) => {
  try {
    const data = await scrapeOurSG();
    fs.writeFileSync(
      "scraped_grants.json",
      JSON.stringify(data, null, 2)
    );
    res.json({
      count: data.length,
      message: "Scraped and saved to scraped_grants.json",
      data,
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
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`Scrape endpoint: http://localhost:${PORT}/scrape`);
});
