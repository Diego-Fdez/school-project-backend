import jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.js';

//verify that the user is registered and Admin
export const checkAuthAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await usersModel
        .findById(decoded._id)
        .select('-password -token -courses -createdAt -updatedAt -__v');
      if (decoded.isAdmin) {
        return next();
      } else {
        return res
          .status(401)
          .json(
            'Permission denied, you must be an administrator for the selected action'
          );
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
  if (!token) {
    return res.status(401).json('Invalid token!');
  }
  next();
};

//verify that the user is registered and Admin
export const checkAuthTeacher = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await usersModel
        .findById(decoded._id)
        .select('-password -token -courses -createdAt -updatedAt -__v');
      if (decoded.isTeacher || decoded.isAdmin) {
        return next();
      } else {
        return res
          .status(401)
          .json(
            'Permission denied, you must be an administrator or teacher for the selected action'
          );
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
  if (!token) {
    return res.status(401).json('Invalid token!');
  }
  next();
};
