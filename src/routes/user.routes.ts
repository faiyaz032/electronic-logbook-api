import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();

const controller = new UserController();

userRouter.get('/', controller.getAllUsers);

export default userRouter;
