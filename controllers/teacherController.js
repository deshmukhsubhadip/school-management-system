import TeacherModel from "../models/teacherModel.js";
import bcrypt from 'bcrypt';
import sendcookie from "../token/teachertoken.js";

const Register = async (req, res) => {
    try {
        const { name, email, subject, password } = req.body;

        // Check if the email already exists
        const existingUser = await TeacherModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists. Please log in.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await TeacherModel.create({
            name,
            email,
            subject,
            password: hashedPassword
        });

        // Send a success response with a cookie
        sendcookie(user, res, "Registered Successfully", 200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during registration",
            error: error.message
        });
    }
};


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await TeacherModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please register first.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password.",
            });
        }

        sendcookie(user, res, "Logged in successfully", 200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed.",
            error: error.message,
        });
    }
};

const alldata = async (req, res) => {
    try {
        const users = await TeacherModel.find();
        res.status(200).json({
            success: true,
            message: "Gives all teacher data",
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was an error retrieving the data",
            error: error.message
        });
    }
};


const SearchbyId = async (req, res) => {
    try {
        const { id } = req.params;


        const user = await TeacherModel.findById(id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Teacher details found",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message
        });
    }
};


const Update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, subject, password } = req.body;

        const user = await TeacherModel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found.",
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (subject) user.subject = subject;
        if (password) user.password = await bcrypt.hash(password, 10); // Hash the new password

        await user.save();

        res.status(200).json({
            success: true,
            message: "Teacher data updated successfully.",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the teacher details.",
            error: error.message,
        });
    }
};

const Delete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await TeacherModel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found.",
            });
        }
        await user.deleteOne();
        res.status(200).json({
            success: true,
            message: "Teacher deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the teacher.",
            error: error.message,
        });
    }
};


const Logout = (req, res) => {
    try {
        // Clear the token cookie by setting its expiration date to a past time
        res.cookie("token", "", {
            expires: new Date(Date.now() - 1000), // Expire the cookie immediately
            httpOnly: true, 
        });

        // Respond with a success message
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error("Logout error: ", error.message); // Log the error for debugging purposes

        // Respond with an error message if something goes wrong
        return res.status(500).json({
            success: false,
            message: "There was a problem logging out",
            error: error.message
        });
    }
};

export { Register, Login, alldata, SearchbyId, Update, Delete, Logout };


