import LevelModel from '../models/levelModel.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

//register a new level
export const registerLevel = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const { desc } = req.body;
  const exist = await LevelModel.findOne({ desc });
  if (exist) {
    return res.status(400).json({ message: 'This level name already exist' });
  }

  const level = new LevelModel(req.body);

  try {
    const newLevel = await level.save();
    const { createdAt, updatedAt, __v, ...data } = newLevel._doc;
    res.status(201).json({ message: 'Level register successfully!', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update level
export const editLevel = async (req, res) => {
  const { id } = req.params;

  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return res.status(404).json({ message: 'ID not valid!' });
  }

  const level = await LevelModel.findById(id);
  //verify that the quarter exists
  if (!level) {
    return res.status(404).json({ message: 'Level not found' });
  }

  //if I pass the previous validations, we modify the D
  level.desc = req.body.desc;
  try {
    const result = await level.save();
    const { createdAt, updatedAt, __v, ...data } = result._doc;
    return res.status(200).json({ message: 'Updated level!', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function that gets all levels
export const getAllLevels = async (req, res) => {
  try {
    const level = await LevelModel.find().select('-createdAt -updatedAt -__v');
    return res.status(200).json(level);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
