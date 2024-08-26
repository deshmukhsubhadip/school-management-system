import express from "express";
import { Register, Login, alldata, SearchbyId, Update, Delete, Logout } from "../controllers/teacherController.js";
import teacherauthentication from "../middleware/teacherauth.js";

const router = express.Router();


router.post("/register", Register);
router.post("/login", Login);
router.get("/allusers",alldata);
router.get("/search/:id",SearchbyId);
router.put("/update/:id", teacherauthentication, Update);
router.delete("/delete/:id", teacherauthentication, Delete);
router.get("/logout", teacherauthentication, Logout);

export default router;


