const { faker } = require('@faker-js/faker');
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

class TestDataGenerator {
  static generateSingleUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: 'password123',
      role: faker.helpers.arrayElement(['ADMIN', 'EMPLOYEE']),
      department: faker.helpers.arrayElement(departments),
      baseSalary: faker.number.int({ min: 30000, max: 150000 }),
      status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE'])
    };
  }

  static generateMultipleUsers(count = 10) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(this.generateSingleUser());
    }
    return users;
  }

  static generateAttendanceRecord(userId) {
    const date = faker.date.recent({ days: 30 });
    const checkIn = faker.date.between({ 
      from: new Date(date.setHours(8, 0, 0)), 
      to: new Date(date.setHours(10, 0, 0)) 
    });
    const checkOut = faker.date.between({ 
      from: new Date(date.setHours(17, 0, 0)), 
      to: new Date(date.setHours(19, 0, 0)) 
    });

    return {
      user: userId,
      date: date.toISOString().split('T')[0], // Format: YYYY-MM-DD
      checkIn,
      checkOut,
      status: faker.helpers.arrayElement(['PRESENT', 'ABSENT', 'LATE'])
    };
  }

  static generateLeaveRecord(userId) {
    const startDate = faker.date.past({ years: 1 });
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + faker.number.int({ min: 1, max: 10 }));

    return {
      user: userId,
      startDate,
      endDate,
      type: faker.helpers.arrayElement(['SICK', 'CASUAL', 'ANNUAL']),
      reason: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED'])
    };
  }

  static generateSalaryRecord(userId) {
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
  }

  static generateCompleteEmployeeData() {
    const user = this.generateSingleUser();
    const attendance = this.generateAttendanceRecord('temp-user-id');
    const leave = this.generateLeaveRecord('temp-user-id');
    const salary = this.generateSalaryRecord('temp-user-id');

    return {
      user,
      attendance,
      leave,
      salary
    };
  }

  static generateBulkTestData(userCount = 10) {
    const testData = {
      users: [],
      attendance: [],
      leave: [],
      salary: []
    };

    for (let i = 0; i < userCount; i++) {
      const user = this.generateSingleUser();
      testData.users.push(user);

      for (let j = 0; j < faker.number.int({ min: 5, max: 20 }); j++) {
        testData.attendance.push(this.generateAttendanceRecord('temp-user-id'));
      }

      for (let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
        testData.leave.push(this.generateLeaveRecord('temp-user-id'));
      }

      for (let j = 0; j < faker.number.int({ min: 6, max: 12 }); j++) {
        testData.salary.push(this.generateSalaryRecord('temp-user-id'));
      }
    }

    return testData;
  }

  static printSampleData() {
    console.log('=== Sample User Data ===');
    console.log(JSON.stringify(this.generateSingleUser(), null, 2));
    
    console.log('\n=== Sample Attendance Data ===');
    console.log(JSON.stringify(this.generateAttendanceRecord('sample-user-id'), null, 2));
    
    console.log('\n=== Sample Leave Data ===');
    console.log(JSON.stringify(this.generateLeaveRecord('sample-user-id'), null, 2));
    
    console.log('\n=== Sample Salary Data ===');
    console.log(JSON.stringify(this.generateSalaryRecord('sample-user-id'), null, 2));
  }
}

if (require.main === module) {
  console.log('Generating sample test data...\n');
  TestDataGenerator.printSampleData();
  
  console.log('\n=== Bulk Test Data Summary ===');
  const bulkData = TestDataGenerator.generateBulkTestData(5);
  console.log(`Generated ${bulkData.users.length} users`);
  console.log(`Generated ${bulkData.attendance.length} attendance records`);
  console.log(`Generated ${bulkData.leave.length} leave records`);
  console.log(`Generated ${bulkData.salary.length} salary records`);
}

module.exports = TestDataGenerator;
