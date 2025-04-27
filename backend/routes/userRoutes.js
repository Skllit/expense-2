// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, analytics } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/expenses', protect, addExpense);
router.get('/expenses', protect, getExpenses);
router.get('/analytics', protect, analytics);

module.exports = router;
