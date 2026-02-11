const Salary = require('../models/Salary');
const User = require('../models/User');
const { generateSalarySlip } = require('../utils/pdfGenerator');

exports.generatePayroll = async (req, res) => {
  try {
    const { month, year } = req.body;
    const employees = await User.find({ role: 'EMPLOYEE', status: 'ACTIVE' });

    const results = await Promise.all(employees.map(async (emp) => {
      const existing = await Salary.findOne({ user: emp._id, month, year });
      if (existing) return existing;

      return await Salary.create({
        user: emp._id,
        month,
        year,
        baseAmount: emp.baseSalary,
        netAmount: emp.baseSalary // Calculation logic could be added here
      });
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadSlip = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id).populate('user');
    if (!salary) return res.status(404).json({ message: 'Salary record not found' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=salary-slip-${salary.month}-${salary.year}.pdf`);

    generateSalarySlip(salary, salary.user, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMySalaries = async (req, res) => {
  try {
    const salaries = await Salary.find({ user: req.user._id }).sort({ year: -1, month: -1 });
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
