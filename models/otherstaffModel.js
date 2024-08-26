import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    department: {
        type: String,
        trim: true,
        required:true
    },

    password: {
        type: String,
        required: true
    }
});

const StaffModel = mongoose.model("StaffDatabase", StaffSchema);

export default StaffModel;
