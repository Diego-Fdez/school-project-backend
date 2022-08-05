import express from 'express';
import { body } from 'express-validator';
import {
  editSCourse,
  getAllCourses,
  registerCourse,
} from '../controllers/courseController.js';
import { checkAuthAdmin, checkAuthTeacher } from '../middleware/checkAuth.js';

const router = express.Router();

router.post(
  '/',
  body('desc', 'description is required').not().isEmpty(),
  checkAuthAdmin,
  registerCourse
);

router.put(
  '/:id',
  body('desc', 'description is required').not().isEmpty(),
  checkAuthAdmin,
  editSCourse
);

router.get('/', checkAuthTeacher, getAllCourses);
export default router;
