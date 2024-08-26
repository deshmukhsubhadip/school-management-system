import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
});

const Holiday = mongoose.model("Holiday", holidaySchema);

export default Holiday;
