const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  userId: String,
  type: { type: String, enum: ['rent', 'electricity'] },
  units: Number,
  amount: Number,
  month: String,
  year: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);