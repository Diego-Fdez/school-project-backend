import express from 'express';
import { body } from 'express-validator';
import {
  registerStudent,
  getStudent,
  editStudent,
  getAllStudents,
  addTeacher,
  deleteTeacher,
} from '../controllers/studentController.js';

const router = express.Router();

router.post(
  '/register',
  body('studentId', 'identification card is required').not().isEmpty(),
  body('studentName', 'the name is required').not().isEmpty(),
  body('studentFirstName', 'the first name is required').not().isEmpty(),
  body('studentLastName', 'the last name is required').not().isEmpty(),
  registerStudent
);

router.get('/', getStudent);
router.put('/', editStudent);
router.get('/all', getAllStudents);
router.put('/add/:id', addTeacher);
router.put('/delete/:id', deleteTeacher);

export default router;
