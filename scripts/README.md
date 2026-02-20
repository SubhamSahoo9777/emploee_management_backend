# Test Data Generation Scripts

This directory contains scripts for generating fake data for testing the Employee Management System using @faker-js/faker.

## Scripts

### 1. seedData.js
Generates and populates the database with 100 fake employees and related records.

**Usage:**
```bash
npm run seed
```

**Features:**
- Creates 100 fake users with realistic data
- Generates attendance records for the past 3 months (weekdays only)
- Creates leave requests with various statuses
- Generates salary records with proper calculations
- Provides sample admin credentials after seeding

**Generated Data Summary:**
- **100 Users** with names, emails, roles, departments, and salaries
- **~6,700 Attendance records** spanning 3 months
- **~300 Leave records** with different types and statuses
- **~900 Salary records** with monthly payment data

### 2. testDataGenerator.js
Utility class for generating test data on demand.

**Usage:**
```bash
npm run test-data
```

**Features:**
- Generate single or multiple user records
- Create attendance, leave, and salary records
- Generate complete employee data sets
- Print sample data for inspection

## Generated Data Types

### Users
- **Name**: Full name using faker's person module
- **Email**: Professional email addresses
- **Password**: Default "password123" for all test accounts
- **Role**: ADMIN or EMPLOYEE (randomly assigned)
- **Department**: One of 10 different departments
- **Base Salary**: $30,000 - $150,000
- **Status**: ACTIVE or INACTIVE

### Attendance
- **Date**: YYYY-MM-DD format for weekdays only
- **Check-in/Check-out**: Realistic work hours (8 AM - 7 PM)
- **Status**: PRESENT, ABSENT, or LATE
- **Time Period**: Last 3 months of data

### Leave
- **Date Range**: Start and end dates with proper validation
- **Type**: SICK, CASUAL, or ANNUAL leave
- **Reason**: Realistic leave descriptions using lorem ipsum
- **Status**: PENDING, APPROVED, or REJECTED

### Salary
- **Monthly Records**: 6-12 months per employee
- **Base Amount**: $30,000 - $150,000
- **Bonus**: $0 - $3,000
- **Deductions**: $0 - $2,000
- **Net Amount**: Automatically calculated (base + bonus - deductions)
- **Status**: PAID or PENDING

## Environment Setup

Make sure your `.env` file contains the MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/ems
```

## Sample Credentials

After running the seed script, sample admin credentials will be displayed:
- **Email**: [generated-admin-email]@example.com
- **Password**: password123

## Available NPM Scripts

```bash
# Install dependencies (includes @faker-js/faker)
npm install

# Seed database with 100 fake employees
npm run seed

# Generate sample test data (doesn't save to database)
npm run test-data
```

## Customization

You can modify the following in the scripts:
- **Number of users**: Change the `count` parameter in `generateFakeUsers()`
- **Date ranges**: Modify the `startDate` and `endDate` in attendance generation
- **Salary ranges**: Adjust min/max values in salary generation functions
- **Department options**: Edit the `departments` array
- **Data probabilities**: Change faker helper probabilities for different distributions

## Data Validation

All generated data follows the Mongoose schema validation:
- **User**: Required fields, proper enum values, unique emails
- **Attendance**: Proper date format, valid status enums
- **Leave**: Valid date ranges, required reason field
- **Salary**: Proper numeric calculations, valid status enums

## Security Notes

- All test accounts use the same password: `password123`
- Email addresses are randomly generated but unique
- No real personal data is used - everything is synthetic
- Remember to change passwords in production environments
