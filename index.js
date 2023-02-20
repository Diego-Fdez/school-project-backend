import dotenv from 'dotenv';
import cors from 'cors';
import app from './app.js';
import { DbConnect } from './database/dbConnection.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

/* Connecting to the database. */
DbConnect();

//cors configuration
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //You can refer to the API
      callback(null, true);
    } else {
      //It's not allowed
      callback(new Error('Error de Cors'));
    }
  },
};

app.use(cors(corsOptions));

/* Listening to the port. */
app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
