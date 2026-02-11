# Employee Management System (EMS) - Production Ready

A full-stack MERN application for managing employees, attendance, leaves, and payroll with secure RBAC.

## Features

- **Authentication**: JWT based Login/Logout with automated token persistence.
- **RBAC**: Separate dashboards and permissions for ADMIN and EMPLOYEE roles.
- **Attendance**: Daily check-in/out logic with "late" detection.
- **Leaves**: Application process with Admin approval/rejection and email notifications.
- **Payroll**: Automated salary record generation and PDF salary slip downloads.
- **Analytics**: Admin dashboard with Recharts visualization of payroll and attendance.

## Prerequisites

- Node.js (v16+)
- MongoDB (Running locally or MongoDB Atlas)
- Mailtrap account (optional, for testing leave notifications)

## Setup Instructions

### 1. Backend Setup

    cd server
    npm install

Create a `.env` file in the `server` directory using the provided `.env.example`. Make sure to add your MongoDB URI and JWT Secret.

### 2. Frontend Setup

    cd client
    npm install

### 3. Running the Application

Open two terminals:

Terminal 1 (Backend):
cd server
npm start

Terminal 2 (Frontend):
cd client
npm start

## Initial Admin Creation

The first user must be registered via the API or directly in MongoDB. You can use Postman to register an admin:
POST `http://localhost:5000/api/auth/register`
Body:
{
"name": "Admin User",
"email": "admin@ems.com",
"password": "admin@123456",
"role": "ADMIN",
"baseSalary": 5000
}

## Default Ports

- Backend: 5000
- Frontend: 3000

## Troubleshooting

- **CORS Errors**: Ensure the `cors` middleware is properly configured in `server.js` matching your client URL.
- **DB Connection**: Ensure MongoDB is running before starting the server.
- **Emails**: If using Mailtrap, verify your SMTP credentials in the `.env` file.
  Create a complete production-ready Employee Management System using the MERN stack (MongoDB, Express.js, React.js, Node.js).

Project Requirements:

1. Authentication & Authorization:

- Implement JWT-based authentication.
- Secure password hashing using bcrypt.
- Role-based access control (Admin and Employee).
- Middleware for protected routes.
- Refresh token mechanism.

2. User Roles:
   Admin:

- Create, edit, delete employees
- Approve/reject leave requests
- View attendance reports
- Manage salary structure
- Access full dashboard analytics

Employee:

- Login/Register
- Check-in / Check-out attendance (with timestamp)
- Apply for leave
- View salary details
- View personal dashboard

3. Attendance System:

- Daily check-in/check-out
- Prevent multiple check-ins per day
- Store date and time properly
- Monthly attendance report

4. Leave Management:

- Leave request with reason and date range
- Admin approval/rejection
- Leave status tracking

5. Salary Management:

- Admin can define base salary
- Add bonuses and deductions
- Monthly salary calculation
- Salary history per employee

6. Dashboard:

- Admin dashboard with charts:
  - Total employees
  - Attendance summary
  - Leave statistics
  - Salary expenses
- Use Chart.js or Recharts for frontend charts.

7. PDF Reports:

- Generate downloadable PDF reports for:
  - Attendance
  - Salary slips
- Use a backend PDF generation library.

8. Features:

- Pagination
- Sorting
- Search functionality
- RESTful API structure
- Proper folder structure (MVC architecture)
- Clean reusable React components
- Axios for API calls
- Environment variables (.env)
- Error handling middleware
- Input validation using express-validator

9. Email Notifications:

- Send email on:
  - Leave approval/rejection
  - Salary generated
- Use Nodemailer.

10. Database:

- Design proper MongoDB schema for:
  - Users
  - Attendance
  - Leave
  - Salary
- Use Mongoose with proper relationships.

11. Code Requirements:

- Write clean, modular, scalable code.
- Add comments explaining key parts.
- Provide full project folder structure.
- Include setup instructions.
- Include sample .env file format.
- Ensure the project is production-ready.

Generate:

- Backend code
- Frontend code
- API routes
- Database models
- Controllers
- Middleware
- Sample dashboard UI
- Installation steps

MONGODB_URI=mongodb://localhost:27017/ems
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development

# SMTP Configuration

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
