import StudentModel from "../models/studentModel.js";
import bcrypt from 'bcrypt';
import sendCookiestudent from "../token/studenttoken.js";

// Register a new student
const registerStudent = async (req, res) => {
    try {
        const { name, rollno, studentclass, email, password } = req.body;

        // Check if the student already exists
        const existingStudent = await StudentModel.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Student already exists. Please log in."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student record
        const student = await StudentModel.create({
            name,
            rollno,
            studentclass,
            email,
            password: hashedPassword
        });

        // Send a success response with a cookie
        sendCookiestudent(student, res, "Registered successfully", 200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during registration",
            error: error.message
        });
    }
};

// Login a student
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the student by email
        const student = await StudentModel.findOne({ email });
        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student not found. Please register first."
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password."
            });
        }

        sendCookiestudent(student, res, "Logged in successfully", 200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

// Get all students' data
const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).json({
            success: true,
            message: "All student data retrieved successfully",
            students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the data",
            error: error.message
        });
    }
};

// Get student data by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the student by ID
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student details retrieved successfully",
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the student details",
            error: error.message
        });
    }
};

// Update student data
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, rollno, studentclass, email, password } = req.body;

        // Find the student by ID
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Update fields if provided
        if (name) student.name = name;
        if (rollno) student.rollno = rollno;
        if (studentclass) student.studentclass = studentclass;
        if (email) student.email = email;
        if (password) student.password = await bcrypt.hash(password, 10);

        await student.save();

        res.status(200).json({
            success: true,
            message: "Student data updated successfully",
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the student details",
            error: error.message
        });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the student by ID
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        await student.deleteOne();

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the student",
            error: error.message
        });
    }
};

// Logout a student
const logoutStudent = (req, res) => {
    try {
        // Clear the token cookie
        res.cookie("token", "", {
            expires: new Date(Date.now() - 1000),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a problem logging out",
            error: error.message
        });
    }
};

export {
    registerStudent,
    loginStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    logoutStudent
};
