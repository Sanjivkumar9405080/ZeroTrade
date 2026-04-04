const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stockSymbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  stockName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    default: 'BUY'
  },
  date: {
    type: String, // YYYY-MM-DD format for intraday tracking
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Position', positionSchema);
