import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';

class UserController {
  getAllUsers = catchAsync(<RequestHandler>(async (req, res, next) => {}));
  getUserById = catchAsync(<RequestHandler>(async (req, res, next) => {}));
  editUser = catchAsync(<RequestHandler>(async (req, res, next) => {}));
  deleteUser = catchAsync(<RequestHandler>(async (req, res, next) => {}));
}

export default UserController;
