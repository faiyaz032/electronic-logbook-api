import { RequestHandler } from 'express';
import UserRepository from '../repository/user.repository';
import catchAsync from '../utils/catchAsync';

class AuthService {
  private repository = new UserRepository();

  /**
   *This service function handle the register business logic.
   */
  register = catchAsync(<RequestHandler>(async (req, res, next) => {}));
}

export default AuthService;
