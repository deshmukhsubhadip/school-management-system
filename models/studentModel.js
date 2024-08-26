import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    studentclass: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
       
    password: {
        type: String,
        required: true
    }
});

const StudentModel = mongoose.model("StudentDatabase", StudentSchema);

export default StudentModel;
