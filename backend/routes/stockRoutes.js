const express = require('express');
const router = express.Router();
const { getAllStocks, getStockBySymbol } = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllStocks);
router.get('/:symbol', protect, getStockBySymbol);

module.exports = router;
