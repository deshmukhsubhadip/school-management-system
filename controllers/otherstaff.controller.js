import StaffModel from "../models/otherstaffModel.js";
import bcrypt from 'bcrypt';
import sendCookiestaff from "../token/otherstafftoken.js";

// Register a new staff member
const registerStaff = async (req, res) => {
    try {
        const { name, email, department, password } = req.body;

        // Check if the staff already exists
        const existingStaff = await StaffModel.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({
                success: false,
                message: "Staff already exists. Please log in."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new staff record
        const staff = await StaffModel.create({
            name,
            email, 
            department,
            password: hashedPassword
        });

        // Send a success response with a cookie
        sendCookiestaff(staff, res, "Registered successfully", 200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during registration",
            error: error.message
        });
    }
};

// Login a staff member
const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the staff by email
        const staff = await StaffModel.findOne({ email });
        if (!staff) {
            return res.status(400).json({
                success: false,
                message: "Staff not found. Please register first."
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password."
            });
        }

        sendCookiestaff(staff, res, "Logged in successfully", 200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

// Get all staff data
const getAllStaff = async (req, res) => {
    try {
        const staff = await StaffModel.find();
        res.status(200).json({
            success: true,
            message: "All staff data retrieved successfully",
            staff
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the data",
            error: error.message
        });
    }
};

// Get staff data by ID
const getStaffById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the staff by ID
        const staff = await StaffModel.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Staff details retrieved successfully",
            staff
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the staff details",
            error: error.message
        });
    }
};

// Update staff data
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, department, password } = req.body;

        // Find the staff by ID
        const staff = await StaffModel.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        // Update fields if provided
        if (name) staff.name = name;
        if (email) staff.email = email;
        if(department) staff.department = department;
        if (password) staff.password = await bcrypt.hash(password, 10);

        await staff.save();

        res.status(200).json({
            success: true,
            message: "Staff data updated successfully",
            staff
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the staff details",
            error: error.message
        });
    }
};

// Delete a staff member
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the staff by ID
        const staff = await StaffModel.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        await staff.deleteOne();

        res.status(200).json({
            success: true,
            message: "Staff deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the staff",
            error: error.message
        });
    }
};

// Logout a staff member
const logoutStaff = (req, res) => {
    try {
        // Clear the token cookie
        res.cookie("token", "", {
            expires: new Date(Date.now() - 1000),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a problem logging out",
            error: error.message
        });
    }
};

export {
    registerStaff,
    loginStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    logoutStaff
};
