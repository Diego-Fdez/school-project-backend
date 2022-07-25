import express from 'express';
import { body } from 'express-validator';
import {
  editSCourse,
  getAllCourses,
  registerCourse,
} from '../controllers/courseController.js';

const router = express.Router();

router.post(
  '/',
  body('desc', 'description is required').not().isEmpty(),
  registerCourse
);

router.put(
  '/:id',
  body('desc', 'description is required').not().isEmpty(),
  editSCourse
);

router.get('/', getAllCourses);
export default router;
