const Position = require('../models/Position');

// @desc    Get today's positions for user
// @route   GET /api/positions
// @access  Private
const getPositions = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const positions = await Position.find({
      userId: req.user._id,
      date: today
    }).sort({ createdAt: -1 });

    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get all positions (history)
// @route   GET /api/positions/all
// @access  Private
const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { getPositions, getAllPositions };
