import mongoose from 'mongoose';

const AssistsSchema = mongoose.Schema(
  {
    studentsInfo: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
    ],
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const AssistsModel = mongoose.model('Assists', AssistsSchema);
export default AssistsModel;
