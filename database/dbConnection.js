import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * It connects to the MongoDB database using the Mongoose library.
 */
export const DbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connection.connection.host}:
    ${connection.connection.port}`;
    console.log(url);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};
