import express from 'express';
import UserRoute from './routes/UserRoute.js';
import StudentRoute from './routes/studentRoute.js';
import quarterRoutes from './routes/quarterRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import quarterResultsRoutes from './routes/quarterResultsRoutes.js';
import assistsRoute from './routes/assistsRoute.js';
import levelRoutes from './routes/assistsRoute.js';
import sectionRoute from './routes/sectionRoute.js';

//Routes
const app = express();
app.use(express.json());

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
