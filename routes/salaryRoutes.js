const express = require('express');
const router = express.Router();
const { generatePayroll, downloadSlip, getMySalaries } = require('../controllers/salaryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/my', getMySalaries);
router.get('/download/:id', downloadSlip);
router.post('/generate', authorize('ADMIN'), generatePayroll);

module.exports = router;
