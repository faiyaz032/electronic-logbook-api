import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';

const apiRoutes = express.Router();

//register all the routes here
apiRoutes.use('/user', userRouter);
apiRoutes.use('/auth', authRouter);

export default apiRoutes;
