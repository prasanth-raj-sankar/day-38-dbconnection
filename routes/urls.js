// routes/urls.js
import express from "express";
import shortid from "shortid";
import { urlModel } from "../db-utils/models.js";

import dotenv from "dotenv"

dotenv.config();
const urlsRouter = express.Router();

// Create a shortened URL
urlsRouter.post("/shorten", async (req, res) => {
  const { originalUrl, userId } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ msg: "Invalid URL" });
  }

  try {
    const shortCode = shortid.generate();
    // const baseUrl = process.env.BASE_URL || "http://localhost:4500/urls";
    const baseUrl = process.env.NEW_URL || "https://day-38-dbconnection.onrender.com/urls";


    const newUrl = new urlModel({
      originalUrl, // Store the original URL
      shortUrl: `${baseUrl}/${shortCode}`, // Construct the short URL
      shortCode,   // Save the short code for easy retrieval
      createdBy: userId,
    });

    await newUrl.save();
    // console.log(newUrl.shortUrl)
    res.json({ msg: "URL shortened successfully", shortUrl: newUrl.shortUrl });
  } catch (error) {
    console.error("Error in URL shortening:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

  
  urlsRouter.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;
    console.log("Received shortCode:", shortCode); // Log the received short code

    try {
        const url = await urlModel.findOne({ shortCode });

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ msg: "URL not found" });
        }
    } catch (error) {
        console.error("Error in URL redirection:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

export default urlsRouter;
