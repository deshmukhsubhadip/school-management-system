import express from 'express';
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks
} from '../controllers/libaryController.js';
import authenticationstaff from "../middleware/otherstaffauth.js";

const router = express.Router();



router.post('/create',authenticationstaff, createBook);
router.put('/update/:id',authenticationstaff, updateBook);
router.delete('/delete/:id',authenticationstaff, deleteBook);
router.get('/all', getAllBooks);

export default router;
