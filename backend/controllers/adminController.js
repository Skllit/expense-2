// backend/controllers/adminController.js
const Department = require('../models/Department');
const Expense = require('../models/Expense');

exports.addDepartment = async (req, res) => {
  try {
    const dept = new Department({ name: req.body.name });
    await dept.save();
    res.json(dept);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const depts = await Department.find();
    res.json(depts);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getPendingExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ status: 'pending' }).populate('user department');
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.approveExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expense.status = 'approved';
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.analytics = async (req, res) => {
  try {
    const expenses = await Expense.find({ status: 'approved' }).populate('department');
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    res.json({ totalExpenses: total, count: expenses.length });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
