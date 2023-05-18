require('dotenv').config();
import express, { Application, urlencoded } from 'express';
import morgan from 'morgan';
import globalErrorMiddleware from './middlewares/globalErrorMiddleware';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import apiRoutes from './routes';

const app: Application = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', apiRoutes);

//Error Middlewares
app.all('*', notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
