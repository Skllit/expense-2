// backend/routes/adminRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  addDepartment, getDepartments, deleteDepartment,
  getPendingExpenses, approveExpense, analytics, getAllExpenses
} = require('../controllers/adminController');

const router = express.Router();

router.post('/departments',     protect, admin, addDepartment);
router.get('/departments',      protect, admin, getDepartments);
router.delete('/departments/:id', protect, admin, deleteDepartment);

router.get('/expenses/pending',  protect, admin, getPendingExpenses);
router.post('/expenses/approve/:id', protect, admin, approveExpense);

// NEW:
router.get('/expenses/all',      protect, admin, getAllExpenses);

router.get('/analytics',         protect, admin, analytics);

module.exports = router;
