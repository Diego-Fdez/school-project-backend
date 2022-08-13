import QuarterModel from '../models/quarterModel.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

//register a new quarter
export const registerQuarter = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { desc } = req.body;
  const exist = await QuarterModel.findOne({ desc });
  if (exist) {
    return res.status(400).json({ message: 'This quarter name already exist' });
  }

  const newQt = new QuarterModel(req.body);

  try {
    const result = await newQt.save();
    const { createdAt, updatedAt, __v, ...data } = result._doc;
    res.status(201).json({ message: 'Quarter register successfully!', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update quarter
export const editSQuarter = async (req, res) => {
  const { id } = req.params;

  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return res.status(404).json({ message: 'ID not valid!' });
  }

  const quarter = await QuarterModel.findById(id);
  //verify that the quarter exists
  if (!quarter) {
    return res.status(404).json({ message: 'Quarter not found' });
  }

  //if I pass the previous validations, we modify the D
  quarter.desc = req.body.desc;
  try {
    const result = await quarter.save();
    const { createdAt, updatedAt, __v, ...data } = result._doc;
    return res.status(200).json({ message: 'Updated quarter!', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that gets all courses
export const getAllQuarters = async (req, res) => {
  try {
    const quarter = await QuarterModel.find().select(
      '-createdAt -updatedAt -__v'
    );
    return res.status(200).json(quarter);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
