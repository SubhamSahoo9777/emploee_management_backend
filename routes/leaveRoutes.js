const express = require('express');
const router = express.Router();
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', applyLeave);
router.get('/', getLeaves);
router.patch('/:id/status', authorize('ADMIN'), updateLeaveStatus);

module.exports = router;
