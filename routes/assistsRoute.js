import express from 'express';
import { body } from 'express-validator';
import { registerAssists } from '../controllers/assistsController.js';
import { checkAuthTeacher } from '../middleware/checkAuth.js';

const router = express.Router();

router.post(
  '/register',
  body('studentsInfo', 'student ID is required').not().isEmpty(),
  body('course', 'course is required').not().isEmpty(),
  checkAuthTeacher,
  registerAssists
);

export default router;
