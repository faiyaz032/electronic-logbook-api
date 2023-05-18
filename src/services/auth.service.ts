import { RequestHandler } from 'express';

import catchAsync from '../utils/catchAsync';

class AuthService {
  /**
   *This service function handle the register business logic.
   */
  register = catchAsync(<RequestHandler>(async (req, res, next) => {}));
}

export default AuthService;
