import AssistsModel from '../models/assistsModel.js';
import { validationResult } from 'express-validator';

//register a new user
export const registerAssists = async (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ error: mistakes.array() });
  }

  const newAssists = new AssistsModel(req.body);

  try {
    await newAssists.save();
    res.status(201).json('Assists register successfully!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
