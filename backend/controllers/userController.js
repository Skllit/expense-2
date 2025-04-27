// backend/controllers/userController.js
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const expense = new Expense({
      user: req.user.id,
      department: req.user.department,
      ...req.body
    });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.analytics = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id, status: 'approved' });
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    res.json({ totalExpenses: total, count: expenses.length });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
