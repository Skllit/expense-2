// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { addDepartment, getDepartments, deleteDepartment, getPendingExpenses, approveExpense, analytics } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllExpenses } = require('../controllers/adminController');


router.get('/expenses/all', protect, admin, getAllExpenses);

router.post('/departments', protect, admin, addDepartment);
router.get('/departments', protect, admin, getDepartments);
router.delete('/departments/:id', protect, admin, deleteDepartment);

router.get('/expenses/pending', protect, admin, getPendingExpenses);
router.post('/expenses/approve/:id', protect, admin, approveExpense);

router.get('/analytics', protect, admin, analytics);

module.exports = router;
