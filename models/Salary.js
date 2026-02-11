const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  baseAmount: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  status: { type: String, enum: ['PAID', 'PENDING'], default: 'PENDING' }
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);
