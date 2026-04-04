const Order = require('../models/Order');
const Holding = require('../models/Holding');
const Position = require('../models/Position');
const Wallet = require('../models/Wallet');

// Helper: get today's date as YYYY-MM-DD
const getTodayDate = () => new Date().toISOString().split('T')[0];

// ============================================================
//  BUY STOCK
// ============================================================
// @desc    Buy a stock
// @route   POST /api/orders/buy
// @access  Private
const buyStock = async (req, res) => {
  try {
    const { stockSymbol, stockName, quantity, price } = req.body;

    // --- Validation ---
    if (!stockSymbol || !stockName || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Quantity and price must be positive' });
    }

    const totalCost = parseFloat((price * quantity).toFixed(2));

    // --- Check wallet balance ---
    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet || wallet.balance < totalCost) {
      return res.status(400).json({
        message: `Insufficient balance! You need ₹${totalCost.toLocaleString('en-IN')} but have ₹${wallet?.balance.toLocaleString('en-IN') || 0}`
      });
    }

    // --- Deduct money from wallet ---
    wallet.balance = parseFloat((wallet.balance - totalCost).toFixed(2));
    await wallet.save();

    // --- Update Holdings (avg price calculation) ---
    const existingHolding = await Holding.findOne({
      userId: req.user._id,
      stockSymbol: stockSymbol.toUpperCase()
    });

    if (existingHolding) {
      // Calculate new average price: (old qty * old avg + new qty * new price) / total qty
      const totalQty = existingHolding.quantity + Number(quantity);
      const newAvgPrice = parseFloat(
        ((existingHolding.quantity * existingHolding.avgPrice + Number(quantity) * price) / totalQty).toFixed(2)
      );
      existingHolding.quantity = totalQty;
      existingHolding.avgPrice = newAvgPrice;
      await existingHolding.save();
    } else {
      // New holding
      await Holding.create({
        userId: req.user._id,
        stockSymbol: stockSymbol.toUpperCase(),
        stockName,
        quantity: Number(quantity),
        avgPrice: price
      });
    }

    // --- Add to Positions (intraday tracking) ---
    await Position.create({
      userId: req.user._id,
      stockSymbol: stockSymbol.toUpperCase(),
      stockName,
      quantity: Number(quantity),
      buyPrice: price,
      type: 'BUY',
      date: getTodayDate()
    });

    // --- Create Order record ---
    const order = await Order.create({
      userId: req.user._id,
      stockSymbol: stockSymbol.toUpperCase(),
      stockName,
      type: 'BUY',
      quantity: Number(quantity),
      price,
      totalAmount: totalCost,
      status: 'COMPLETED'
    });

    res.status(201).json({
      message: `✅ Successfully bought ${quantity} shares of ${stockSymbol} at ₹${price}`,
      order,
      newBalance: wallet.balance
    });

  } catch (error) {
    console.error('Buy error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// ============================================================
//  SELL STOCK
// ============================================================
// @desc    Sell a stock
// @route   POST /api/orders/sell
// @access  Private
const sellStock = async (req, res) => {
  try {
    const { stockSymbol, stockName, quantity, price } = req.body;

    // --- Validation ---
    if (!stockSymbol || !stockName || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Quantity and price must be positive' });
    }

    // --- Check if user owns the stock ---
    const holding = await Holding.findOne({
      userId: req.user._id,
      stockSymbol: stockSymbol.toUpperCase()
    });

    if (!holding) {
      return res.status(400).json({ message: `You don't own any shares of ${stockSymbol}` });
    }

    if (holding.quantity < Number(quantity)) {
      return res.status(400).json({
        message: `You only have ${holding.quantity} shares of ${stockSymbol}, cannot sell ${quantity}`
      });
    }

    const totalRevenue = parseFloat((price * quantity).toFixed(2));

    // --- Update Holdings ---
    if (holding.quantity === Number(quantity)) {
      // Sold all shares → remove holding
      await Holding.deleteOne({ _id: holding._id });
    } else {
      // Partial sell
      holding.quantity -= Number(quantity);
      await holding.save();
    }

    // --- Add money to wallet ---
    const wallet = await Wallet.findOne({ userId: req.user._id });
    wallet.balance = parseFloat((wallet.balance + totalRevenue).toFixed(2));
    await wallet.save();

    // --- Add to Positions (intraday) ---
    await Position.create({
      userId: req.user._id,
      stockSymbol: stockSymbol.toUpperCase(),
      stockName,
      quantity: Number(quantity),
      buyPrice: price,
      type: 'SELL',
      date: getTodayDate()
    });

    // --- Create Order record ---
    const order = await Order.create({
      userId: req.user._id,
      stockSymbol: stockSymbol.toUpperCase(),
      stockName,
      type: 'SELL',
      quantity: Number(quantity),
      price,
      totalAmount: totalRevenue,
      status: 'COMPLETED'
    });

    res.status(201).json({
      message: `✅ Successfully sold ${quantity} shares of ${stockSymbol} at ₹${price}`,
      order,
      newBalance: wallet.balance
    });

  } catch (error) {
    console.error('Sell error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get all orders for the user
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { buyStock, sellStock, getOrders };
