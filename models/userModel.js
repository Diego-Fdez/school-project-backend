import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model('Users', UserSchema);
export default UserModel;
