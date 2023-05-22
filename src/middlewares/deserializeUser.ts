import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  //extract the accessToken
  const accessToken = (req.headers.authorization || '').split(' ')[1];

  //if there is no accessToken then pass it to the next function
  if (!accessToken) {
    return next();
  }

  //decode the token
  const decoded = verifyJwt(accessToken, 'accessTokenPrivateKey');

  //attach it to the locals
  if (decoded) {
    res.locals.user = decoded;
  }

  //return to next function
  return next();
};

export default deserializeUser;
