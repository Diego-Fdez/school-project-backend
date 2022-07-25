import QuarterResultsModel from '../models/quarterResultsModel.js';
import StudentModel from '../models/studentModel.js';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

//register a new quarterResult
export const registerQuarterResult = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { studentId, course, createdAt } = req.body;
  const exist = await QuarterResultsModel.findOne({
    course,
    studentId,
    createdAt,
  });
  if (exist) {
    return res
      .status(400)
      .json({ message: 'There is already student data for this course' });
  }

  const newData = new QuarterResultsModel(req.body);

  try {
    await newData.save();
    return res
      .status(201)
      .json({ message: 'Data register successfully!', newData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update quarter results
export const editQtResults = async (req, res) => {
  const { id } = req.params;

  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return res.status(404).json({ message: 'ID not valid!' });
  }

  const qtResults = await QuarterResultsModel.findById(id);
  //verify that the quarter results exists
  if (!qtResults) {
    return res
      .status(404)
      .json({ message: 'No quarterly results recorded not found' });
  }

  //if the user does not send all the data, use the data from the DB
  qtResults.course = req.body.course || qtResults.course;
  qtResults.studentId = req.body.studentId || qtResults.studentId;
  qtResults.test1 = req.body.test1 || qtResults.test1;
  qtResults.perTest1 = req.body.perTest1 || qtResults.perTest1;
  qtResults.test2 = req.body.test2 || qtResults.test2;
  qtResults.perTest2 = req.body.perTest2 || qtResults.perTest2;
  qtResults.assists = req.body.assists || qtResults.assists;
  qtResults.homework = req.body.homework || qtResults.homework;
  qtResults.level = req.body.level || qtResults.level;

  //if I pass the previous validations, we modify the DB
  try {
    await qtResults.save();
    return res.status(200).json({ message: 'Updated Results!', qtResults });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that gets all results student by StudentID
export const getStudentResultsById = async (req, res) => {
  const { studentId } = req.body;

  const student = await StudentModel.findOne({
    studentId,
  }).select(
    '-studentId -studentName -studentFirstName -studentLastName -teachers -createdAt -updatedAt -__v'
  );

  const currentStudent = await QuarterResultsModel.findOne({
    id: student._id.toString(),
  })
    .select('-_id -createdAt -updatedAt -__v')
    .populate('course', 'desc')
    .populate('studentId', 'studentName studentFirstName studentLastName')
    .populate('quarter', 'desc')
    .populate('level', 'desc');

  try {
    //verify that the student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json(currentStudent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that get Results by ID
export const getResults = async (req, res) => {
  try {
    const results = await QuarterResultsModel.find()
      .select('-_id -createdAt -updatedAt -__v')
      .select('-_id -createdAt -updatedAt -__v')
      .populate('course', 'desc')
      .populate('studentId', 'studentName studentFirstName studentLastName')
      .populate('quarter', 'desc')
      .populate('level', 'desc');

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
