import mongoose from 'mongoose';

const QuarterSchema = mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const QuarterModel = mongoose.model('Quarter', QuarterSchema);
export default QuarterModel;
