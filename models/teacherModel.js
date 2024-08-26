import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    subject: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }
});

const TeacherModel = mongoose.model("TeacherDatabase", TeacherSchema);

export default TeacherModel;
