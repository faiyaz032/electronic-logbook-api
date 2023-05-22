import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return next(new AppError(403, 'You are not authenticated'));
  }
  return next();
};

export default isAuthenticated;
