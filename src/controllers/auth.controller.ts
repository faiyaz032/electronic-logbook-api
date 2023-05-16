import { Request, RequestHandler } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import AuthService from '../services/auth.service';
import catchAsync from '../utils/catchAsync';

class AuthController {
  private service = new AuthService();

  /**
   *This controller function will handle the register functionality
   */
  register = catchAsync(<RequestHandler>(
    (async (req: Request<{}, {}, CreateUserInput>, res, next) => {})
  ));
  login = catchAsync(<RequestHandler>(async (req, res, next) => {}));
}

export default AuthController;
