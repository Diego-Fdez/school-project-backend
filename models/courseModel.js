import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model('Courses', CourseSchema);
export default CourseModel;
