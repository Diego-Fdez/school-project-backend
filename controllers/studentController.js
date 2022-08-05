import { validationResult } from 'express-validator';
import StudentModel from '../models/studentModel.js';
import UserModel from '../models/usersModel.js';

//register a new student
export const registerStudent = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { studentId } = req.body;
  const userExist = await StudentModel.findOne({ studentId });
  if (userExist) {
    return res
      .status(400)
      .json({ message: 'Student with this ID already exist' });
  }

  const newUser = new StudentModel(req.body);

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ message: 'Student register successfully!', newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that gets a student by project ID
export const getStudent = async (req, res) => {
  const { studentId } = req.params;

  const student = await StudentModel.findOne({ studentId }).populate(
    'teachers',
    'userName firstName'
  );

  try {
    //verify that the student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const { createdAt, updatedAt, __v, ...data } = student._doc;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that gets all students
export const getAllStudents = async (req, res) => {
  const student = await StudentModel.find().select(
    '-createdAt -updatedAt -__v'
  );

  try {
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update student
export const editStudent = async (req, res) => {
  const { studentId } = req.body;

  const student = await StudentModel.findOne({ studentId })
    .select('-createdAt -updatedAt -__v')
    .populate('teachers', 'userName firstName');
  //verify that the student exists
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  //if the user does not send all the data, use the data from the DB
  student.studentName = req.body.studentName || student.studentName;
  student.studentId = req.body.studentId || student.studentId;
  student.studentFirstName =
    req.body.studentFirstName || student.studentFirstName;
  student.studentLastName = req.body.studentLastName || student.studentLastName;
  student.contact = req.body.contact || student.contact;
  student.observations = req.body.observations || student.observations;

  //if I pass the previous validations, we modify the DB
  try {
    await student.save();
    return res.status(200).json({ message: 'Updated student!', student });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//add teachers into student
export const addTeacher = async (req, res) => {
  const student = await StudentModel.findById(req.params.id)
    .select('-createdAt -updatedAt -__v')
    .populate('teachers', 'userName firstName');
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { email } = req.body;
  const teacher = await UserModel.findOne({ email }).select(
    '-isAdmin -IsTeacher -courses -createdAt -updatedAt -__v'
  );
  //we check if the teacher exists
  if (!teacher) {
    return res.status(404).json({ message: 'teacher not found' });
  }

  //check that the teacher is not already added to the student
  if (student.teachers.includes(teacher._id)) {
    return res
      .status(404)
      .json({ message: 'The teacher was already included' });
  }

  //if I pass the previous validations, we modify the DB
  student.teachers.push(teacher._id);
  await student.save();
  return res.status(200).json('Teacher successfully included');
};

//delete teacher from student
export const deleteTeacher = async (req, res) => {
  const student = await StudentModel.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  //if it passes the validations, the collaborator is removed
  student.teachers.pull(req.body.id);
  await student.save();
  res.status(200).json('Teacher removed successfully');
};
