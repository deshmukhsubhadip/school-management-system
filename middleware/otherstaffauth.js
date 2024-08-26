import StaffModel from "../models/otherstaffModel.js";
import jwt from "jsonwebtoken";

const authenticationstaff = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // Replace 'YOUR_SECRET_KEY' with your actual secret key
        const decoded = jwt.verify(token,process.env.JWT_SECRETstaff);

        if (!decoded._id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }


        // Fetch user from the database
        req.user = await StaffModel.findById(decoded._id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};

export default authenticationstaff;
