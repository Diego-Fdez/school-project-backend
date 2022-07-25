import express from 'express';
import { body } from 'express-validator';
import {
  addCourse,
  checkToken,
  deleteCourse,
  forgetPassword,
  getAllTeacher,
  getTeacher,
  loginUser,
  registerUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post(
  '/register',
  body('email', 'email is required').isEmail(),
  body('userName', 'the first name is required').not().isEmpty(),
  body('firstName', 'the last name is required').not().isEmpty(),
  body('password', 'the password is required').isLength({ min: 5 }),
  registerUser
);
router.post(
  '/login',
  body('email', 'email is required').isEmail(),
  body('password', 'the password is required').not().isEmpty(),
  loginUser
);

router.post('/forgetpwd', forgetPassword);
router.get('/forgetpwd/:token', checkToken);
router.put('/add/:id', addCourse);
router.put('/delete/:id', deleteCourse);
router.get('/', getTeacher);
router.get('/all', getAllTeacher);

export default router;
