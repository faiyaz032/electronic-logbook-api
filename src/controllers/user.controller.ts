import { NextFunction, Request, Response } from 'express';
import { CreateUserInput, VerifyUserInput } from '../schema/user.schema';
import UserService from '../services/user.service';
import AppError from '../utils/AppError';
import sendEmail from '../utils/mailer';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  /**
   * This function handle user creation.
   */
  createUserHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    try {
      const user = await this.service.createUser(body);

      await sendEmail({
        from: 'test@example.com',
        to: user.email,
        subject: 'Please verify your account',
        text: `Verification code is: ${user.verificationCode}. User ID is :${user._id}`,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 11000) {
        next(new AppError(409, 'Account already exists!'));
      }
      next(new AppError(500, error.message));
    }
  };

  /**
   * This method handles user verification
   */
  verifyUserHandler = async (req: Request<VerifyUserInput>, res: Response, next: NextFunction) => {
    //extract
    const { id, verificationCode } = req.params;

    try {
      const user = await this.service.getUserById(id);

      if (!user) {
        return next(new AppError(400, 'Could not verify user!'));
      }
      if (user?.verified) {
        return next(new AppError(400, 'User is already verified'));
      }

      if (user?.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.status(200).json('User successfully Verified');
      } else {
        return next(new AppError(400, 'Could not verify user'));
      }
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };
}

export default UserController;
