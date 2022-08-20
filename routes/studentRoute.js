import express from 'express';
import { body } from 'express-validator';
import {
  registerStudent,
  getStudent,
  editStudent,
  addTeacher,
  deleteTeacher,
  getAllStudents,
} from '../controllers/studentController.js';
import { checkAuthAdmin, checkAuthTeacher } from '../middleware/checkAuth.js';

const router = express.Router();

router.post(
  '/register',
  body('studentId', 'identification card is required').not().isEmpty(),
  body('studentName', 'the name is required').not().isEmpty(),
  body('studentFirstName', 'the first name is required').not().isEmpty(),
  body('studentLastName', 'the last name is required').not().isEmpty(),
  checkAuthAdmin,
  registerStudent
);

router.get('/student/:studentId', getStudent);
router.put('/', checkAuthAdmin, editStudent);
router.get('/all', checkAuthTeacher, getAllStudents);
router.put('/add/:id', checkAuthAdmin, addTeacher);
router.put('/delete/:id', checkAuthAdmin, deleteTeacher);

export default router;
