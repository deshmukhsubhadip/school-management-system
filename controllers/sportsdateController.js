import Sport from '../models/sportsdateModel.js';
import TeacherModel from '../models/teacherModel.js';

// Create a new sport
const createSport = async (req, res) => {
    try {
        const { teacherId, sportName, className, description, date, time, place } = req.body;

        // Check if the teacherId exists in the Teacher collection
        const teacherExists = await TeacherModel.findById(teacherId);
        if (!teacherExists) {
            return res.status(400).json({ 
                success: false,
                message: 'Teacher ID does not exist'
            });
        }

        // Create a new sport entry
        const sport = await Sport.create({
            teacherId,
            sportName,
            className,
            description,
            date,
            time,
            place
        });

        res.status(201).json({
            success: true,
            message: "Sport created successfully",
            sport
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "An error occurred",
            error: error.message 
        });
    }
};

const getAllSports = async (req, res) => {
    try {
        const { className, sportName } = req.query;

        // Create a filter object that includes both className and sportName if provided
        const filter = {};
        if (className) filter.className = className;
        if (sportName) filter.sportName = sportName;

        const sports = await Sport.find(filter);
        res.status(200).json({
            success: true,
            message: className && sportName 
                ? `Retrieved sports for class: ${className} and sport: ${sportName}`
                : className 
                ? `Retrieved sports for class: ${className}`
                : sportName 
                ? `Retrieved sports for sport: ${sportName}`
                : "Retrieved all sports",
            sports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update a sport by ID
const updateSport = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSport = await Sport.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSport) {
            return res.status(404).json({
                success: false,
                message: 'Sport not found'
            });
        }
        res.status(200).json({
            success: true,
            message: "Sport updated successfully",
            updatedSport
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete a sport by ID
const deleteSport = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSport = await Sport.findByIdAndDelete(id);
        if (!deletedSport) {
            return res.status(404).json({ 
                success: false,
                message: 'Sport not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Sport deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    createSport,
    getAllSports,
    updateSport,
    deleteSport
};
