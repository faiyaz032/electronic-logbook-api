import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import SessionModel from '../models/Session';
import { User, privateFields } from '../models/User';
import { signJwt } from '../utils/jwt';

class AuthService {
  private model = SessionModel;

  private createSession = async (userId: string) => {
    return this.model.create({ user: userId });
  };

  signRefreshToken = async (userId: string) => {
    const session = await this.createSession(userId);

    const refreshToken = signJwt(
      {
        session: session._id,
      },
      'refreshTokenPrivateKey',
      {
        expiresIn: '1y',
      }
    );

    return refreshToken;
  };

  signAccessToken = (user: DocumentType<User>) => {
    const payload = omit(user.toJSON(), privateFields);
    const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
      expiresIn: '30m',
    });
    return accessToken;
  };

  findSessionById = (id: string) => {
    return this.model.findById(id);
  };
}

export default AuthService;
