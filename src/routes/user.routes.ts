import express from 'express';
import UserController from '../controllers/user.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import validateResource from '../middlewares/validateResource';
import {
  createUserSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from '../schema/user.schema';

const userRouter = express.Router();

const controller = new UserController();

userRouter.post('/', validateResource(createUserSchema), controller.createUserHandler);

userRouter.post(
  '/verify/:verificationCode/:id',
  validateResource(verifyUserSchema),
  controller.verifyUserHandler
);

userRouter.post(
  '/forgetPassword',
  validateResource(forgetPasswordSchema),
  controller.forgetPasswordHandler
);

userRouter.post(
  '/resetPassword/:id/:passwordResetCode',
  validateResource(resetPasswordSchema),
  controller.resetPasswordHandler
);

userRouter.get('/me', isAuthenticated, controller.getLoggedInUserHandler);

export default userRouter;
