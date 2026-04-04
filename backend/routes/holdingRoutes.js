const express = require('express');
const router = express.Router();
const { getHoldings } = require('../controllers/holdingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getHoldings);

module.exports = router;
