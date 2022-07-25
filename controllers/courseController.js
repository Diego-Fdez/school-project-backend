import CourseModel from '../models/courseModel.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

//register a new course
export const registerCourse = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { desc } = req.body;
  const courseExist = await CourseModel.findOne({ desc });
  if (courseExist) {
    return res.status(400).json({ message: 'This course already exist' });
  }

  const newCourse = new CourseModel(req.body);

  try {
    await newCourse.save();
    res.status(201).json('Course register successfully!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update course
export const editSCourse = async (req, res) => {
  const { id } = req.params;

  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return res.status(404).json({ message: 'ID not valid!' });
  }

  const course = await CourseModel.findById(id);
  //verify that the course exists
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  //if I pass the previous validations, we modify the DB
  course.desc = req.body.desc;
  try {
    await course.save();
    return res.status(200).json('Updated course!');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that gets all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find().select(
      '-createdAt -updatedAt -__v'
    );
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
