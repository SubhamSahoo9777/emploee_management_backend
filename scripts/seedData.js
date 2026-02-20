const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Salary = require('../models/Salary');

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Customer Support',
  'Product',
  'Design',
  'Data Analytics'
];

const generateFakeUsers = async (count = 100) => {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    
    const user = {
      name: `${firstName} ${lastName}`,
      email: email,
      password: 'password123',
      role: faker.helpers.arrayElement(['ADMIN', 'EMPLOYEE']),
      department: faker.helpers.arrayElement(departments),
      baseSalary: faker.number.int({ min: 30000, max: 150000 }),
      status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE'])
    };
    
    users.push(user);
  }
  
  return users;
};

const generateFakeAttendance = (userId, startDate, endDate) => {
  const attendance = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      attendance.push({
        user: userId,
        date: currentDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
        checkIn: faker.date.between({ 
          from: new Date(currentDate.setHours(8, 0, 0)), 
          to: new Date(currentDate.setHours(10, 0, 0)) 
        }),
        checkOut: faker.date.between({ 
          from: new Date(currentDate.setHours(17, 0, 0)), 
          to: new Date(currentDate.setHours(19, 0, 0)) 
        }),
        status: faker.helpers.arrayElement(['PRESENT', 'ABSENT', 'LATE'])
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return attendance;
};

const generateFakeLeave = (userId) => {
  const leaveTypes = ['SICK', 'CASUAL', 'ANNUAL'];
  const leaveStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
  
  const startDate = faker.date.past({ years: 1 });
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + faker.number.int({ min: 1, max: 10 }));
  
  return {
    user: userId,
    startDate,
    endDate,
    type: faker.helpers.arrayElement(leaveTypes),
    reason: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(leaveStatuses)
  };
};

const generateFakeSalary = (userId) => {
  const baseAmount = faker.number.int({ min: 30000, max: 150000 });
  const bonus = faker.number.int({ min: 0, max: 3000 });
  const deductions = faker.number.int({ min: 0, max: 2000 });
  const netAmount = baseAmount + bonus - deductions;
  
  return {
    user: userId,
    month: faker.number.int({ min: 1, max: 12 }),
    year: faker.number.int({ min: 2023, max: 2024 }),
    baseAmount,
    bonus,
    deductions,
    netAmount,
    status: faker.helpers.arrayElement(['PAID', 'PENDING'])
  };
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ems');
    console.log('Connected to MongoDB');
    
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Salary.deleteMany({});
    
    console.log('Generating fake users...');
    const users = await generateFakeUsers(100);
    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users`);
    
    console.log('Generating attendance records...');
    const attendanceRecords = [];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    const endDate = new Date();
    
    for (const user of createdUsers) {
      const userAttendance = generateFakeAttendance(user._id, startDate, endDate);
      attendanceRecords.push(...userAttendance);
    }
    
    await Attendance.insertMany(attendanceRecords);
    console.log(`Created ${attendanceRecords.length} attendance records`);
    
    console.log('Generating leave records...');
    const leaveRecords = [];
    for (const user of createdUsers) {
      const numLeaves = faker.number.int({ min: 1, max: 5 });
      for (let i = 0; i < numLeaves; i++) {
        leaveRecords.push(generateFakeLeave(user._id));
      }
    }
    
    await Leave.insertMany(leaveRecords);
    console.log(`Created ${leaveRecords.length} leave records`);
    
    console.log('Generating salary records...');
    const salaryRecords = [];
    for (const user of createdUsers) {
      const numSalaries = faker.number.int({ min: 6, max: 12 });
      for (let i = 0; i < numSalaries; i++) {
        salaryRecords.push(generateFakeSalary(user._id));
      }
    }
    
    await Salary.insertMany(salaryRecords);
    console.log(`Created ${salaryRecords.length} salary records`);
    
    console.log('Database seeded successfully!');
    console.log('\nSample admin credentials:');
    const adminUser = createdUsers.find(u => u.role === 'ADMIN');
    if (adminUser) {
      console.log(`Email: ${adminUser.email}`);
      console.log('Password: password123');
    }
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = {
  generateFakeUsers,
  generateFakeAttendance,
  generateFakeLeave,
  generateFakeSalary,
  seedDatabase
};
