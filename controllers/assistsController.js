import StudentModel from '../models/studentModel.js';
import AssistsModel from '../models/assistsModel.js';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

//register a new assists
export const registerAssists = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { studentId, createdAt } = req.body;
  const exist = await AssistsModel.findOne({
    studentId,
    createdAt,
  });
  if (exist) {
    return res.status(400).json({
      message: 'The student is already registered in the attendance sheet',
    });
  }

  const newData = new AssistsModel(req.body);

  try {
    await newData.save();
    return res
      .status(201)
      .json({ message: 'Assists register successfully!', newData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
