import express from 'express';
import { body } from 'express-validator';
import {
  editLevel,
  getAllLevels,
  registerLevel,
} from '../controllers/levelController.js';

const router = express.Router();

router.post(
  '/',
  body('desc', 'description is required').not().isEmpty(),
  registerLevel
);

router.put(
  '/:id',
  body('desc', 'description is required').not().isEmpty(),
  editLevel
);

router.get('/', getAllLevels);
export default router;
