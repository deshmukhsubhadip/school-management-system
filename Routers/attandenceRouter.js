import express from 'express';
import { 
    createAttendance, 
    getAttendanceByStudentId, 
    updateAttendance, 
    deleteAttendance 
} from '../controllers/attandenceController.js';
import  teacherauthentication  from '../middleware/teacherauth.js';



const router = express.Router();


router.post('/create', teacherauthentication, createAttendance);
router.get('/:studentId', getAttendanceByStudentId);
router.put('/update/:id', teacherauthentication, updateAttendance);
router.delete('/delete/:id', teacherauthentication, deleteAttendance);

export default router;
