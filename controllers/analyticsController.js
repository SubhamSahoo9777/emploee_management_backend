const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Salary = require('../models/Salary');
const moment = require('moment');

exports.getSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'EMPLOYEE' });
    const today = moment().format('YYYY-MM-DD');
    const presentToday = await Attendance.countDocuments({ date: today });
    const pendingLeaves = await Leave.countDocuments({ status: 'PENDING' });
    
    // Last 6 months payroll expense
    const recentSalaries = await Salary.aggregate([
      { $group: { _id: { month: "$month", year: "$year" }, amount: { $sum: "$netAmount" } } },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 }
    ]);

    const chartData = recentSalaries.map(s => ({
      month: `${s._id.month}/${s._id.year}`,
      amount: s.amount
    })).reverse();

    const totalPayroll = recentSalaries[0]?.amount || 0;

    res.json({
      totalUsers,
      presentToday,
      pendingLeaves,
      totalPayroll,
      chartData
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
