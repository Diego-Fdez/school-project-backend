import { validationResult } from 'express-validator';
import SectionModel from '../models/sectionModel.js';
import StudentModel from '../models/studentModel.js';
import mongoose from 'mongoose';

//register a new section
export const registerList = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { desc } = req.body;
  const sectionExist = await SectionModel.findOne({ desc });
  if (sectionExist) {
    return res
      .status(400)
      .json({ message: 'Section with this description already exist' });
  }

  const newData = new SectionModel(req.body);

  try {
    const newList = await newData.save();
    return res
      .status(201)
      .json({ message: 'Section list register successfully!', newList });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that gets all sections
export const getAllSections = async (req, res) => {
  try {
    const list = await SectionModel.find()
      .select('-createdAt -updatedAt -__v')
      .populate(
        'studentsInfo',
        'studentName studentFirstName studentLastName studentId'
      );
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that get a section by desc
export const getSection = async (req, res) => {
  const { desc } = req.params;

  try {
    const result = await SectionModel.findOne({ desc })
      .select('-createdAt -updatedAt -__v')
      .populate(
        'studentsInfo',
        'studentName studentFirstName studentLastName studentId _id'
      );
    //verify that the section exists
    if (!result) {
      return res.status(404).json({ message: 'Section not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//add student into section
export const addStudent = async (req, res) => {
  const id = req.params.id;

  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return res.status(404).json({ message: 'Not a valid section id' });
  }

  const section = await SectionModel.findById(id);

  if (!section) {
    return res.status(404).json({ message: 'Section not found' });
  }

  const { studentId } = req.body;
  const student = await StudentModel.findOne({ studentId }).select(
    '-createdAt -updatedAt -__v -teachers -contact -observations'
  );
  //we check if the student exists
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  //check that the student is not already added to the student
  if (section.studentsInfo.includes(student._id)) {
    return res
      .status(404)
      .json({ message: 'The Student was already included' });
  }
  //if I pass the previous validations, we modify the DB
  section.studentsInfo.push(student._id);

  const studentSaved = await section.save();
  const { createdAt, updatedAt, __v, ...newStudent } = studentSaved._doc;

  return res
    .status(200)
    .json({ message: 'Student successfully included', newStudent, student });
};

//delete student from section
export const deleteStudent = async (req, res) => {
  const id = req.params.id;

  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return res.status(404).json({ message: 'Not a valid section id' });
  }

  const section = await SectionModel.findById(id);

  if (!section) {
    return res.status(404).json({ message: 'Section not found' });
  }

  //if it passes the validations, the student is removed
  section.studentsInfo.pull(req.body.id);
  await section.save();
  res.status(200).json('Student removed successfully');
};

//delete section list
export const deleteList = async (req, res) => {
  const { id } = req.params;

  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return res.status(404).json({ message: 'Not a valid section id' });
  }

  const list = await SectionModel.findById(id).select(
    '-createdAt -updatedAt -desc -__v'
  );
  //check that the section exists
  if (!list) {
    return res.status(404).json({ message: 'Section not found' });
  }

  //if it passes the validations, the list is removed
  try {
    await list.deleteOne();
    return res.status(200).json({ message: 'Section deleted!', list });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
