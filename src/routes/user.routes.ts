import express from 'express';
import UserController from '../controllers/user.controller';
import validateResource from '../middlewares/validateResource';
import { createUserSchema, verifyUserSchema } from '../schema/user.schema';

const userRouter = express.Router();

const controller = new UserController();

userRouter.post('/', validateResource(createUserSchema), controller.createUserHandler);

userRouter.post('/verify', validateResource(verifyUserSchema), controller.verifyUserHandler);

export default userRouter;
