const Attendance = require('../models/Attendance');
const moment = require('moment');

exports.checkIn = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const existing = await Attendance.findOne({ user: req.user._id, date: today });

    if (existing) {
      return res.status(400).json({ message: 'Already checked in for today' });
    }

    const attendance = await Attendance.create({
      user: req.user._id,
      date: today,
      checkIn: new Date(),
      status: moment().hour() > 9 ? 'LATE' : 'PRESENT'
    });

    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const attendance = await Attendance.findOne({ user: req.user._id, date: today });

    if (!attendance) return res.status(404).json({ message: 'No check-in record found' });
    if (attendance.checkOut) return res.status(400).json({ message: 'Already checked out' });

    attendance.checkOut = new Date();
    await attendance.save();

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAttendanceHistory = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user._id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
