const Holding = require('../models/Holding');

// @desc    Get all holdings for user
// @route   GET /api/holdings
// @access  Private
const getHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.user._id }).sort({ stockSymbol: 1 });
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { getHoldings };
