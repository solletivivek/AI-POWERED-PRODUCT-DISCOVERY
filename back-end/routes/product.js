const express = require('express');
const axios = require('axios');
const router = express.Router();

// Proxy request to AI engine
router.post('/search', async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5001/search", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "AI search failed", error });
    }
});

module.exports = router;
