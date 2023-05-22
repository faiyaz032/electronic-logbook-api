import { NextFunction, Request, Response } from 'express';
import { v4 as generateId } from 'uuid';
import {
  CreateUserInput,
  ForgetPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from '../schema/user.schema';
import UserService from '../services/user.service';
import AppError from '../utils/AppError';
import log from '../utils/logger';
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
        return next(new AppError(409, 'Account already exists!'));
      }
      return next(new AppError(500, error.message));
    }
  };

  /**
   * This method handles user verification
   */
  verifyUserHandler = async (req: Request<VerifyUserInput>, res: Response, next: NextFunction) => {
    //extract the id and verificationCode
    const { id, verificationCode } = req.params;

    try {
      const user = await this.service.getUserById(id);

      if (!user) {
        return next(new AppError(400, 'Could not verify user!'));
      }
      if (user.verified) {
        return next(new AppError(400, 'User is already verified'));
      }

      if (user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.status(200).json('User successfully Verified');
      } else {
        return next(new AppError(400, 'Could not verify user'));
      }
    } catch (error: any) {
      return next(new AppError(500, error.message));
    }
  };

  /**
   * This method sends forget password email to the user
   */
  forgetPasswordHandler = async (
    req: Request<{}, {}, ForgetPasswordInput>,
    res: Response,
    next: NextFunction
  ) => {
    //extract the email from request body
    const { email } = req.body;

    try {
      const user = await this.service.getUserByEmail(email);

      if (!user) {
        return next(new AppError(404, 'No user found with this email'));
      }

      if (!user?.verified) {
        return next(new AppError(400, 'User is not verified'));
      }

      const passwordResetCode = generateId();
      user.passwordResetCode = passwordResetCode;
      await user.save();

      await sendEmail({
        to: user.email,
        from: 'faiyaz@dev.com',
        subject: 'Reset your password',
        text: `Your password reset code is: ${passwordResetCode}. Id: ${user._id}`,
      });

      log.debug(`Password reset email sent to :${user.email}`);
      return res.status(200).json({
        status: 'success',
        message: 'Password reset code successfully sent to your email',
      });
    } catch (error: any) {
      log.error(error);
      next(new AppError(500, error.message));
    }
  };

  /**
   * This method reset the password of a user
   */
  resetPasswordHandler = async (
    req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;

    try {
      const user = await this.service.getUserById(id);

      if (!user) {
        return next(new AppError(404, 'No user found with this id'));
      }
      if (!user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
        return next(new AppError(400, 'Cannot reset password'));
      }

      user.passwordResetCode = null;
      user.password = password;
      await user.save();

      return res
        .status(200)
        .json({ status: 'success', message: 'User password change successfully' });
    } catch (error: any) {
      log.error(error);
      next(new AppError(500, error.message));
    }
  };

  getLoggedInUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    return res.send(res.locals.user);
  };
}

export default UserController;
