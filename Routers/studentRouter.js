import express from "express";
import {
    registerStudent,
    loginStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    logoutStudent
} from "../controllers/studentController.js";
import authenticationstudent from "../middleware/studentauth.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/allusers", getAllStudents);
router.get("/search/:id", getStudentById);
router.put("/update/:id", authenticationstudent, updateStudent);
router.delete("/delete/:id", authenticationstudent, deleteStudent);
router.get("/logout", authenticationstudent, logoutStudent);

export default router;
