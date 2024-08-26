import express from 'express';
import { createSport, getAllSports, updateSport, deleteSport } from '../controllers/sportsdateController.js';
import teacherauthentication from "../middleware/teacherauth.js";





const router = express.Router();




router.post('/create',teacherauthentication, createSport);
router.get('/all', getAllSports);
router.put('/update/:id',teacherauthentication, updateSport);
router.delete('/delete/:id',teacherauthentication, deleteSport);

export default router;
