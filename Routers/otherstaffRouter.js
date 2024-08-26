import express from "express";
import {
    registerStaff,
    loginStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    logoutStaff
}from "../controllers/otherstaff.controller.js";
import authenticationstaff from "../middleware/otherstaffauth.js";

const router = express.Router();

router.post("/register", registerStaff);
router.post("/login", loginStaff);
router.get("/allusers", getAllStaff);
router.get("/search/:id", getStaffById);
router.put("/update/:id", authenticationstaff, updateStaff);
router.delete("/delete/:id", authenticationstaff, deleteStaff);
router.get("/logout", authenticationstaff, logoutStaff);

export default router;
