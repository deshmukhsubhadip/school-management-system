import ExamSchedule from "../models/examlistModel.js";
import TeacherModel from "../models/teacherModel.js";

// Utility function to check if a teacher exists
const findTeacherById = async (teacherId) => {
    return await TeacherModel.findById(teacherId);
};

// Create a new exam schedule
const createExamSchedule = async (req, res) => {
    try {
        const { className, subject, examtype, examDate, startTime, endTime, teacherId } = req.body;

        // Validate teacher ID
        const teacher = await findTeacherById(teacherId);
        if (!teacher) {
            return res.status(400).json({
                success: false,
                message: "Teacher not found",
            });
        }

        // Create the exam schedule
        const exam = new ExamSchedule({
            className,
            subject,
            examtype,
            examDate,
            startTime,
            endTime,
            teacherId, // Associate the exam with the teacher
        });

        // Save the exam schedule
        await exam.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Exam schedule created successfully",
            data: exam,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the exam schedule",
            error: error.message,
        });
    }
};

// Retrieve all exam schedules
const getAllExamSchedules = async (req, res) => {
    try {
        // Get the className parameter from the request query
        const { className } = req.query;

        // Build query object
        let query = {};
        if (className) {
            query.className = className;  // Assuming className is the field in your schema
        }

        // Find exam schedules based on query
        const exams = await ExamSchedule.find(query);

        // Check if exams exist
        if (exams.length === 0) {
            return res.status(404).json({
                success: false,
                message: className ? "No exam schedules found for the specified class" : "No exam schedules found",
            });
        }

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Exam schedules retrieved successfully",
            data: exams,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the exam schedules",
            error: error.message,
        });
    }
};

// Update an existing exam schedule
const updateExamSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { className, subject, examtype, examDate, startTime, endTime, teacherId } = req.body;

        // Find the exam schedule by ID
        const exam = await ExamSchedule.findById(id);
        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "Exam schedule not found",
            });
        }

        // Optionally update the teacher field if teacherId is provided
        if (teacherId) {
            const teacher = await findTeacherById(teacherId);
            if (!teacher) {
                return res.status(400).json({
                    success: false,
                    message: "Teacher not found",
                });
            }
            exam.teacherId = teacherId; // Update the teacher ID
        }

        // Update the exam schedule fields
        exam.className = className || exam.className;
        exam.subject = subject || exam.subject;
        exam.examtype = examtype || exam.examtype;
        exam.examDate = examDate || exam.examDate;
        exam.startTime = startTime || exam.startTime;
        exam.endTime = endTime || exam.endTime;

        // Save the updated exam schedule
        await exam.save();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Exam schedule updated successfully",
            data: exam,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the exam schedule",
            error: error.message,
        });
    }
};

// Delete an exam schedule
const deleteExamSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the exam schedule by ID
        const exam = await ExamSchedule.findById(id);
        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "Exam schedule not found",
            });
        }

        // Delete the exam schedule
        await exam.deleteOne();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Exam schedule deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the exam schedule",
            error: error.message,
        });
    }
};

export {
    createExamSchedule,
    getAllExamSchedules,
    updateExamSchedule,
    deleteExamSchedule,
};
