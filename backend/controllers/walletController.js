const Wallet = require('../models/Wallet');

// @desc    Get user wallet balance
// @route   GET /api/wallet
// @access  Private
const getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user._id });

    // If wallet doesn't exist, create it
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user._id, balance: 100000 });
    }

    res.json({ balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Add funds to wallet
// @route   POST /api/wallet/add
// @access  Private
const addFunds = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Please enter a valid amount' });
    }
    if (amount > 1000000) {
      return res.status(400).json({ message: 'Maximum deposit limit is ₹10,00,000' });
    }

    const wallet = await Wallet.findOneAndUpdate(
      { userId: req.user._id },
      { $inc: { balance: Number(amount) } },
      { new: true, upsert: true }
    );

    res.json({
      message: `₹${amount} added to wallet successfully! 💰`,
      balance: wallet.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { getWallet, addFunds };
