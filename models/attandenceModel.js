import mongoose from 'mongoose';

// Define the schema for attendance
const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    class: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Excused'],
        required: true
    }
}, {
    timestamps: true
});

// Create and export the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
