import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js';
import StudentRoute from './routes/studentRoute.js';
import quarterRoutes from './routes/quarterRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import quarterResultsRoutes from './routes/quarterResultsRoutes.js';
import assistsRoute from './routes/assistsRoute.js';
import levelRoutes from './routes/levelRoutes.js';
import sectionRoute from './routes/sectionRoute.js';

dotenv.config();

//Routes
const app = express();
app.use(express.json());

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

//usage of routes
app.use('/auth', UserRoute);
app.use('/student', StudentRoute);
app.use('/quarter', quarterRoutes);
app.use('/course', courseRoutes);
app.use('/qt-results', quarterResultsRoutes);
app.use('/assists', assistsRoute);
app.use('/levels', levelRoutes);
app.use('/list', sectionRoute);

export default app;
