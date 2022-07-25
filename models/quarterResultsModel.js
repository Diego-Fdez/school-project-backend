import mongoose from 'mongoose';

const QuarterResultsSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courses',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    quarter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quarter',
      required: true,
    },
    test1: {
      type: Number,
    },
    perTest1: {
      type: Number,
    },
    test2: {
      type: Number,
    },
    perTest2: {
      type: Number,
    },
    assists: {
      type: Number,
    },
    homework: {
      type: Number,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true,
    },
  },
  { timestamps: true }
);

const QuarterResultsModel = mongoose.model(
  'QuarterResults',
  QuarterResultsSchema
);
export default QuarterResultsModel;
