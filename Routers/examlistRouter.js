import express from 'express';
import  {
    createExamSchedule,
    getAllExamSchedules,
    updateExamSchedule,
    deleteExamSchedule,
} from '../controllers/examlistController.js';
import teacherauthentication from "../middleware/teacherauth.js";

const router = express.Router();

router.post('/create',teacherauthentication, createExamSchedule);
router.get('/all', getAllExamSchedules);
router.put('/update/:id',teacherauthentication, updateExamSchedule);
router.delete('/delete/:id',teacherauthentication, deleteExamSchedule);

export default router;
