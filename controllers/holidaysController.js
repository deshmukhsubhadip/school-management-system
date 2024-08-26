import Holiday from "../models/holidaysModel.js"; 



// Create a new holiday
const createHoliday = async (req, res) => {
    try {
        const { name, date, description } = req.body;

        const newHoliday = await Holiday.create({
            name,
            date,
            description,
        });

        res.status(200).json({
            success: true,
            message: "Holiday created successfully",
            holiday: newHoliday
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating holiday",
            error: error.message
        });
    }
};

// Get all holidays
const getAllHolidays = async (req, res) => {
    try {
        const holidays = await Holiday.find();
        res.status(200).json({
            success: true,
            holidays
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving holidays",
            error: error.message
        });
    }
};

// Update a holiday
const updateHoliday = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date, description } = req.body;

        const updatedHoliday = await Holiday.findByIdAndUpdate(
            id,
            { name, date, description },
            { new: true }
        );

        if (!updatedHoliday) {
            return res.status(404).json({
                success: false,
                message: "Holiday not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Holiday updated successfully",
            holiday: updatedHoliday
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating holiday",
            error: error.message
        });
    }
};

// Delete a holiday
const deleteHoliday = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedHoliday = await Holiday.findById(id);

        if (!deletedHoliday) {
            return res.status(404).json({
                success: false,
                message: "Holiday not found"
            });
        }
        
        await deletedHoliday.deleteOne();

        res.status(200).json({
            success: true,
            message: "Holiday deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting holiday",
            error: error.message
        });
    }
};

// Corrected export statement
export  { createHoliday, getAllHolidays, updateHoliday, deleteHoliday };
