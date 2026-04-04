const express = require('express');
const router = express.Router();
const { buyStock, sellStock, getOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getOrders);
router.post('/buy', protect, buyStock);
router.post('/sell', protect, sellStock);

module.exports = router;
