const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/summary', protect, authorize('ADMIN'), getSummary);

module.exports = router;
