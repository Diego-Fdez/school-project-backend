import express from 'express';
import { body } from 'express-validator';
import {
  editQtResults,
  getResults,
  getStudentResultsById,
  registerQuarterResult,
} from '../controllers/quarterResultsController.js';

const router = express.Router();

router.post(
  '/register',
  body('course', 'Course is required').not().isEmpty(),
  body('studentId', 'the studentId is required').not().isEmpty(),
  body('level', 'the level is required').not().isEmpty(),
  body('quarter', 'the quarter is required').not().isEmpty(),
  registerQuarterResult
);

router.put(
  '/:id',
  body('course', 'Course is required').not().isEmpty(),
  body('studentId', 'the studentId is required').not().isEmpty(),
  body('level', 'the level is required').not().isEmpty(),
  body('quarter', 'the quarter is required').not().isEmpty(),
  editQtResults
);

router.get('/', getStudentResultsById);

router.get('/all', getResults);

export default router;
