import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentFirstName: {
      type: String,
      required: true,
    },
    studentLastName: {
      type: String,
      required: true,
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    contact: {
      type: String,
    },
    observations: {
      type: String,
    },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model('Student', StudentSchema);
export default StudentModel;
