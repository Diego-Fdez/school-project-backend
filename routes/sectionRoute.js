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

const router = express.Router();

router.post(
  '/register',
  body('desc', 'description is required').not().isEmpty(),
  registerList
);
router.get('/all', getAllSections);
router.get('/', getSection);
router.put('/add/:id', addStudent);
router.put('/delete/:id', deleteStudent);
router.delete('/:id', deleteList);

export default router;
