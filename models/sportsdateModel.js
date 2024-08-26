import mongoose from 'mongoose';

const sportSchema = new mongoose.Schema({
    sportName: {
        type: String,
        required: true,
        trim: true
    },
    className: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true,
        trim: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher', 
        required: true
    }
}, {
    timestamps: true 
});

const Sport = mongoose.model('SportDatabase', sportSchema);

export default Sport;
