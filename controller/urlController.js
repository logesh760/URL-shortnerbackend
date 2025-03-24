const URL = require('../models/urlModel');
const shortid = require('short-unique-id');
const asyncHandler = require('express-async-handler');

// Create a new instance of the shortid generator with length 8
const uid = new shortid({ length: 8 });

// Create short URL function
const createshortId = asyncHandler(async (req, res) => {
    const { url } = req.body;
    const shorterid = uid.rnd(); // Generate a random short ID

    if (!url) {
        return res.status(400).json({ mes: "URL is required" });
    }

    // Check if the shortid already exists to avoid duplicate short links
    const existingURL = await URL.findOne({ shortid: shorterid });
    if (existingURL) {
        return res.status(400).json({ mes: "Short URL already exists. Please try again." });
    }

    // Create the new short URL document
    const result = await URL.create({
        shortid: shorterid,
        redirectURL: url,
        History: [],
        createBy: req.user._id,  // Assuming req.user._id contains the user ID
    });

    if (!result) {
        return res.status(500).json({ mes: "Something went wrong" });
    }

    return res.status(200).json({ shortid: shorterid });
});

// Get the history of created URLs for the user
const getHistory = asyncHandler(async (req, res) => {
    const History = await URL.find({ createBy: req.user._id });  // Corrected from req.user.id to req.user._id

    if (!History || History.length === 0) {
        return res.status(404).json({ mes: "No URLs found for this user" });
    }

    res.status(200).json({ urls: History });
});

module.exports = { getHistory, createshortId };
