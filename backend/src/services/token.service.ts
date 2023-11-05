import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import { IJwtPayload } from '../interfaces/IJwtPayload.js';
import { ITokens } from '../interfaces/ITokens.js';
import Token from '../models/tokens.model.js';
import { ISaveTokens } from '../interfaces/ISaveToken.js';
import ApiError from './error.service.js';

class UserSessionService {
  generateTokens = (payload: IJwtPayload): ITokens => {
    const accessToken = jwt.sign(payload, <string>process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, <string>process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  };

  saveToken = async (tokenInfo: ISaveTokens, isRefresh = false): Promise<void> => {
    const tokenData = (await models.Token.findOne({ where: { userId: tokenInfo.userId } })) as Token;
    if (tokenData && !isRefresh) {
      throw ApiError.conflict('User is already signed in');
    }

    if (isRefresh) {
      await tokenData.update({
        refreshToken: tokenInfo.refreshToken,
      });
    } else {
      await models.Token.create({
        userId: tokenInfo.userId,
        refreshToken: tokenInfo.refreshToken,
      });
    }
  };

  validateRefreshToken = (refreshToken: string): IJwtPayload => {
    return jwt.verify(refreshToken, String(process.env.JWT_REFRESH_SECRET)) as IJwtPayload;
  };

  removeToken = async (refreshToken: string): Promise<void> => {
    await models.Token.destroy({ where: { refreshToken } });
  };
}

export default new UserSessionService();
