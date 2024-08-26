import mongoose from "mongoose";

const examScheduleSchema = new mongoose.Schema({
  className: {
    type: String, // Rename from 'class' to 'className' to avoid conflicts with reserved keywords
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  examtype: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String, // Consider changing to Date or a more specific time format if needed
    required: true
  },
  endTime: {
    type: String, // Same as above, consider using Date or another time format
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ExamSchedule = mongoose.model('ExamSchedule', examScheduleSchema);

export default ExamSchedule;
