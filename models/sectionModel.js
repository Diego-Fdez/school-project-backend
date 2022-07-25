import mongoose from 'mongoose';

const SectionSchema = mongoose.Schema(
  {
    studentsInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
    ],
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SectionModel = mongoose.model('Section', SectionSchema);
export default SectionModel;
