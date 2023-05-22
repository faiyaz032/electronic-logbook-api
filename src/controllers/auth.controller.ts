import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { CreateSessionInput } from '../schema/auth.schema';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import AppError from '../utils/AppError';
import { verifyJwt } from '../utils/jwt';

class AuthController {
  private service = new AuthService();
  private userService = new UserService();

  /**
   *This controller function will handle the register functionality
   */
  createSessionHandler = async (
    req: Request<{}, {}, CreateSessionInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) return next(new AppError(401, 'Incorrect email or password'));

      const isValidPassword = await user.validatePassword(password);

      if (!isValidPassword) return next(new AppError(401, 'Incorrect email or password'));

      //sign accessToken
      const accessToken = this.service.signAccessToken(user);
      //sign refreshToken
      const refreshToken = await this.service.signRefreshToken(user._id as unknown as string);
      //send response
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error: any) {
      console.log(error);
      next(new AppError(500, error.message));
    }
  };

  /**
   * This function refresh the access token
   * @param req
   * @param res
   * @param next
   */
  refreshAccessTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = get(req, 'headers.x-refresh') as string;

    const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPrivateKey');

    if (!decoded) {
      return next(new AppError(401, 'Could not refresh access token 1'));
    }

    const session = await this.service.findSessionById(decoded.session);

    if (!session || !session.valid) {
      return next(new AppError(401, 'Could not refresh access token 2'));
    }

    const user = await this.userService.getUserById(String(session.user));
    if (!user) {
      return next(new AppError(401, 'Could not refresh access token 3'));
    }
    const accessToken = this.service.signAccessToken(user);
    return res.status(200).json({ accessToken });
  };
}

export default AuthController;
