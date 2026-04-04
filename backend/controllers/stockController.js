// Fetch stock data from MongoDB and add live simulation
const Stock = require('../models/Stock');

// Add slight random price movement to simulate live data
const getStocksWithLiveSimulation = (stocks) => {
  return stocks.map(stock => {
    // We use .toObject() if it's a mongoose document
    const stockObj = stock.toObject ? stock.toObject() : stock;
    const randomChange = (Math.random() - 0.5) * 2; // -1 to +1
    const newPrice = parseFloat((stockObj.price + randomChange).toFixed(2));
    return { ...stockObj, price: newPrice };
  });
};

// @desc    Get all stocks
// @route   GET /api/stocks
// @access  Private
const getAllStocks = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { symbol: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const stocks = await Stock.find(query);
    const result = getStocksWithLiveSimulation(stocks);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get single stock by symbol
// @route   GET /api/stocks/:symbol
// @access  Private
const getStockBySymbol = async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    
    // Add live price variation
    const [simulated] = getStocksWithLiveSimulation([stock]);
    res.json(simulated);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { getAllStocks, getStockBySymbol };
