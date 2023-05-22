import jwt from 'jsonwebtoken';

/**
 * This function will sign a jwt token
 * @param payload
 * @param keyName
 */

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) => {
  const signingKey =
    keyName === 'refreshTokenPrivateKey'
      ? process.env.REFRESH_TOKEN_PRIVATE_KEY
      : process.env.ACCESS_TOKEN_PRIVATE_KEY;

  return jwt.sign(payload, signingKey as string, {
    ...(options && options),
  });
};

/**
 * This function will verify and decode the jwt token
 * @param token
 * @param keyName
 * @returns Jwt Payload | null
 */
export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey'
): T | null => {
  const privateKey =
    keyName === 'refreshTokenPrivateKey'
      ? process.env.REFRESH_TOKEN_PRIVATE_KEY
      : process.env.ACCESS_TOKEN_PRIVATE_KEY;

  try {
    const decoded = jwt.verify(token, privateKey as string) as T;

    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
