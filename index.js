import express from 'express';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoute from './routes/UserRoute.js';
import StudentRoute from './routes/studentRoute.js';
import quarterRoutes from './routes/quarterRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import quarterResultsRoutes from './routes/quarterResultsRoutes.js';
import assistsRoute from './routes/assistsRoute.js';
import levelRoutes from './routes/levelRoutes.js';
import sectionRoute from './routes/sectionRoute.js';

//Routes
const app = express();
app.use(express.json());

//Middleware
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

dotenv.config();

const PORT = process.env.PORT || 5000;

const DbConnect = async () => {
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
DbConnect();

//cors configuration
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      //No esta Permitido
      callback(new Error('Error de Cors'));
    }
  },
};

app.use(cors(corsOptions));

const server = app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});

//usage of routes
app.use('/auth', UserRoute);
app.use('/student', StudentRoute);
app.use('/quarter', quarterRoutes);
app.use('/course', courseRoutes);
app.use('/qt-results', quarterResultsRoutes);
app.use('/assists', assistsRoute);
app.use('/levels', levelRoutes);
app.use('/list', sectionRoute);
