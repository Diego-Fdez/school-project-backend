import mongoose from 'mongoose';

const LevelSchema = mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LevelModel = mongoose.model('Level', LevelSchema);
export default LevelModel;
