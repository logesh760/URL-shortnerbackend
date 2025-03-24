const express = require('express');
const { createshortId, getHistory } = require('../controller/urlController');  // Correct destructuring

const router = express.Router();

// POST route to create a short URL
router.post('/', createshortId);

// GET route to retrieve URL creation history
router.get('/', getHistory);

module.exports = router;
