const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  checkIn: { type: Date },
  checkOut: { type: Date },
  status: { type: String, enum: ['PRESENT', 'ABSENT', 'LATE'], default: 'PRESENT' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
