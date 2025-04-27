// backend/models/Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
