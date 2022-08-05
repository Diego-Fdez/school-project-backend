import express from 'express';
import { body } from 'express-validator';
import {
  registerQuarter,
  editSQuarter,
  getAllQuarters,
} from '../controllers/quarterController.js';
import { checkAuthAdmin } from '../middleware/checkAuth.js';

const router = express.Router();

router.post(
  '/',
  body('desc', 'description is required').not().isEmpty(),
  checkAuthAdmin,
  registerQuarter
);

router.put(
  '/:id',
  body('desc', 'description is required').not().isEmpty(),
  checkAuthAdmin,
  editSQuarter
);

router.get('/', getAllQuarters);
export default router;
