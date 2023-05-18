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
        text: `Verification code is: ${user.verificationCode}`,
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
    const { id, verificationCode } = req.params;
  };
}

export default UserController;
