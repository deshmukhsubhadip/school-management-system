School Management System

Overview
This project is a comprehensive School Management System built using Node.js, Express.js, and MongoDB. It manages various school operations including teacher details, student details, staff details, attendance, exam schedules, holidays, library, and sports schedules.

Features
Teacher, Student, and Staff Management: Create, update, view, and delete details.
Attendance Management: Track student attendance with full CRUD operations.
Exam Schedule: Manage exam dates, subjects, and schedules.
Holiday List: Maintain a list of school holidays.
Library Management: Handle book details and inventory.
Sports Schedule: Manage sports events, including dates, times, and locations.
Authentication: Secure authentication for students, staff, and teachers using middleware.

Installation
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/school-management-system.git
cd school-management-system
Install dependencies:
bash
Copy code
npm install
Set up environment variables (create a .env file):
plaintext
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Start the server:
bash
Copy code
npm start

Testing
Use Postman to test the API endpoints. All endpoints are secured and require authentication.

Models
Teacher: Manages teacher information.
Student: Manages student details.
Staff: Manages staff information.
Attendance: Tracks student attendance.
ExamSchedule: Handles exam schedules.
Holiday: Lists school holidays.
Library: Manages books in the library.
Sport: Manages sports events.
Authentication
Authentication is handled using JWT tokens. Different roles (teachers, students, staff) have appropriate access to specific routes.

Database
Data is stored in MongoDB with unique IDs for each entry.
