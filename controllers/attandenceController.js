import Attendance from '../models/attandenceModel.js';
import mongoose from 'mongoose';
import StudentModel from "../models/studentModel.js";
import TeacherModel from "../models/teacherModel.js";

// Create attendance record
const createAttendance = async (req, res) => {
    try {
        const { studentId, class: className, teacherId, date, status } = req.body;

        // Check if the student exists in the database
        const studentExists = await StudentModel.findById(studentId);
        if (!studentExists) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Check if the teacher exists in the database
        const teacherExists = await TeacherModel.findById(teacherId);
        if (!teacherExists) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        // Check if attendance record already exists for the same student on the same date
        const existingAttendance = await Attendance.findOne({
            studentId,
            date
        });

        if (existingAttendance) {
            return res.status(409).json({
                success: false,
                message: 'Attendance record for this student on the same date already exists'
            });
        }

        // Proceed to create the attendance record
        const attendance = await Attendance.create({
            studentId,
            class: className,
            teacherId,
            date,
            status
        });

        res.status(201).json({
            success: true,
            message: "Attendance record created successfully",
            attendance
        });
    } catch (error) {
        console.error("Error creating attendance record:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating attendance data",
            error: error.message
        });
    }
};




// Get attendance records by student ID
const getAttendanceByStudentId = async (req, res) => {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid Student ID' 
        });
    }

    try {
        // Check if the student exists
        const student = await StudentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({ 
                success: false,
                message: 'Student not found' 
            });
        }

        // Retrieve attendance records for the student
        const attendanceRecords = await Attendance.find({ studentId });

        if (!attendanceRecords.length) {
            return res.status(404).json({ 
                success: false,
                message: 'No attendance records found for this student'
            });
        }

        res.status(200).json({
            success: true,
            message: "Attendance records retrieved successfully",
            attendanceRecords
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
};


// Update attendance record
const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid attendance ID'
        });
    }

    try {
        // Find the attendance record by ID and update its status
        const attendance = await Attendance.findOneAndUpdate(
            { _id: id },
            { status },
            { new: true, runValidators: true }
        );

        // If the attendance record does not exist, return a 404 response
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }

        // Successfully updated the attendance record
        res.status(200).json({
            success: true,
            message: "Attendance record updated successfully",
            attendance
        });
    } catch (error) {
        // Handle any errors that occur during the update process
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the attendance record",
            error: error.message
        });
    }
};



// Delete attendance record
const deleteAttendance = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    try {
        const attendance = await Attendance.findOneAndDelete({ _id: id });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Attendance record deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting attendance record:', error);
        res.status(500).json({
            success: false,
            message: 'Server error, please try again later'
        });
    }
};


export { createAttendance, getAttendanceByStudentId, updateAttendance, deleteAttendance };
