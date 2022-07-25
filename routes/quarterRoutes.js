import express from 'express';
import { body } from 'express-validator';
import {
  registerQuarter,
  editSQuarter,
  getAllQuarters,
} from '../controllers/quarterController.js';

const router = express.Router();

router.post(
  '/',
  body('desc', 'description is required').not().isEmpty(),
  registerQuarter
);

router.put(
  '/:id',
  body('desc', 'description is required').not().isEmpty(),
  editSQuarter
);

router.get('/', getAllQuarters);
export default router;
