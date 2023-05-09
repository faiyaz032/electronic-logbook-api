import express from 'express';
import userRouter from './user.routes';

const apiRoutes = express.Router();

//register all the routes here
apiRoutes.use('/user', userRouter);

export default apiRoutes;
