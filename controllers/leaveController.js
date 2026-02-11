const Leave = require('../models/Leave');
const User = require('../models/User');
const { sendEmail } = require('../config/mailer');

exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason, type } = req.body;
    const leave = await Leave.create({
      user: req.user._id,
      startDate,
      endDate,
      reason,
      type
    });
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const filter = req.user.role === 'ADMIN' ? {} : { user: req.user._id };
    const leaves = await Leave.find(filter).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findById(req.params.id).populate('user');
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    leave.status = status;
    await leave.save();

    // Send notification
    await sendEmail({
      to: leave.user.email,
      subject: `Leave Request Update: ${status}`,
      text: `Your leave request from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been ${status}.`
    });

    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
