import express from 'express';
import { createHoliday, getAllHolidays, updateHoliday, deleteHoliday } from "../controllers/holidaysController.js"; 

import authenticationstaff from "../middleware/otherstaffauth.js";

const router = express.Router();


router.post('/create',authenticationstaff, createHoliday);
router.get('/all', getAllHolidays);
router.put('/update/:id',authenticationstaff, updateHoliday);
router.delete('/delete/:id',authenticationstaff, deleteHoliday);

export default router;
