import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { emailForgetPassword } from '../helpers/email.js';
import generateId from '../helpers/generateId.js';
import CourseModel from '../models/courseModel.js';

//register a new user
export const registerUser = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { email } = req.body;
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .json({ message: 'User with this email already exist' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);

  try {
    newUser.token = generateId();
    await newUser.save();
    res.status(201).json('User register successfully!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const didMatch = bcrypt.compareSync(password, userExist.password);
    if (didMatch) {
      const jwtToken = jwt.sign(
        { _id: userExist._id },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
      const { _id, email, firstName, userName, isAdmin, isTeacher } = userExist;
      res.json({
        token: jwtToken,
        userInfo: {
          _id,
          email,
          firstName,
          userName,
          isAdmin,
          isTeacher,
        },
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//password recovery function
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  //check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User does not exist!' });
  }

  //if the user exists
  try {
    user.token = generateId();
    await user.save();

    //send the email
    emailForgetPassword({
      email: user.email,
      userName: user.userName,
      token: user.token,
    });

    return res
      .status(200)
      .json('We have sent an email with account recovery instructions');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that checks the token
export const checkToken = async (req, res) => {
  const { token } = req.params;
  const tokenValid = await UserModel.findOne({ token });

  if (tokenValid) {
    return res.status(200).json('Valid token and user exists');
  } else {
    return res.status(404).json({ message: 'Invalid token!' });
  }
};

//add courses into teacher
export const addCourse = async (req, res) => {
  const teacher = await UserModel.findById(req.params.id);
  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }

  const { id } = req.body;
  const course = await CourseModel.findById(id).select(
    '-createdAt -updatedAt -__v'
  );
  //we check if the course exists
  if (!course) {
    return res.status(404).json({ message: 'Curse not found' });
  }

  //check that the course is not already added to the teacher
  if (teacher.courses.includes(course._id)) {
    return res.status(404).json({ message: 'The course was already included' });
  }
  //if I pass the previous validations, we modify the DB
  teacher.courses.push(course._id);
  await teacher.save();
  return res.status(200).json('Course successfully included');
};

//delete course from teacher
export const deleteCourse = async (req, res) => {
  const teacher = await UserModel.findById(req.params.id);

  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }

  //if it passes the validations, the collaborator is removed
  teacher.courses.pull(req.body.id);
  await teacher.save();
  res.status(200).json('Course removed successfully');
};

//function that gets a teacher by ID
export const getTeacher = async (req, res) => {
  const { email } = req.body;

  const teacher = await UserModel.findOne({ email }).populate(
    'courses',
    'desc'
  );

  try {
    //verify that the teacher exists
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const { createdAt, updatedAt, __v, ...data } = teacher._doc;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that get all teacher
export const getAllTeacher = async (req, res) => {
  const teacher = await UserModel.find()
    .select('-createdAt -updatedAt -__v')
    .populate('courses', 'desc');

  try {
    //verify that the teacher exists
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    return res.status(200).json(teacher);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
