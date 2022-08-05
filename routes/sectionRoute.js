import express from 'express';
import { body } from 'express-validator';
import {
  addStudent,
  deleteList,
  deleteStudent,
  getAllSections,
  getSection,
  registerList,
} from '../controllers/sectionController.js';
import { checkAuthAdmin, checkAuthTeacher } from '../middleware/checkAuth.js';

const router = express.Router();

router.post(
  '/register',
  body('desc', 'description is required').not().isEmpty(),
  registerList
);
router.get('/all', checkAuthTeacher, getAllSections);
router.get('/', checkAuthTeacher, getSection);
router.put('/add/:id', checkAuthAdmin, addStudent);
router.put('/delete/:id', checkAuthAdmin, deleteStudent);
router.delete('/:id', checkAuthAdmin, deleteList);

export default router;
