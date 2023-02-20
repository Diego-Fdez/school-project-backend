import dotenv from 'dotenv';

import app from './app.js';
import { DbConnect } from './database/dbConnection.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

/* Connecting to the database. */
DbConnect();

/* Listening to the port. */
app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
