import express from 'express';
import { body } from 'express-validator';
import {
  editLevel,
  getAllLevels,
  registerLevel,
} from '../controllers/levelController.js';
import { checkAuthAdmin, checkAuthTeacher } from '../middleware/checkAuth.js';

const router = express.Router();

router.post(
  '/',
  body('desc', 'description is required').not().isEmpty(),
  checkAuthAdmin,
  registerLevel
);

router.put(
  '/:id',
  body('desc', 'description is required').not().isEmpty(),
  checkAuthAdmin,
  editLevel
);

router.get('/', checkAuthTeacher, getAllLevels);
export default router;
