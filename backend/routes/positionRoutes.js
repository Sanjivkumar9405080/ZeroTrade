const express = require('express');
const router = express.Router();
const { getPositions, getAllPositions } = require('../controllers/positionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getPositions);
router.get('/all', protect, getAllPositions);

module.exports = router;
