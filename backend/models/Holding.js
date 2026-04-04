const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
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
    required: true,
    min: 1
  },
  avgPrice: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

// Compound index: one holding per user per stock
holdingSchema.index({ userId: 1, stockSymbol: 1 }, { unique: true });

module.exports = mongoose.model('Holding', holdingSchema);
