import ApiError from './error.service.js';
import bcrypt from 'bcrypt';
import models from '../models/index.js';
import tokenService from './token.service.js';
import User from '../models/users.model.js';
import { IRegistration } from '../interfaces/IRegistration.js';
import { ILogin } from '../interfaces/ILogin.js';
import { ITokensWithUser } from '../interfaces/ITokens.js';

class AuthService {
  registration = async (userData: IRegistration): Promise<void> => {
    const checkingForEmail = await models.User.findOne({ where: { email: userData.email } });
    if (checkingForEmail) {
      throw ApiError.conflict('User with this email already exists');
    }
    const checkingForUserName = await models.User.findOne({ where: { userName: userData.userName } });
    if (checkingForUserName) {
      throw ApiError.conflict('User with this UserName already exists');
    }

    const hashPassword = await bcrypt.hash(userData.password, 5);

    await models.User.create({ email: userData.email, password: hashPassword, userName: userData.userName });
  };

  login = async (userData: ILogin): Promise<ITokensWithUser> => {
    const user = await models.User.findOne({ where: { userName: userData.userName } });
    if (!user) {
      throw ApiError.notFound('User with this username not found');
    }
    const password = await bcrypt.compare(userData.password, user.password);
    if (!password) {
      throw ApiError.badRequest('Invalid password');
    }

    const tokens = tokenService.generateTokens({ userId: Number(user.id), userName: user.email });
    await tokenService.saveToken({ userId: Number(user.id), refreshToken: tokens.refreshToken });

    return {
      ...tokens,
      user,
    };
  };

  refresh = async (refreshToken: string): Promise<ITokensWithUser> => {
    if (!refreshToken) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await models.Token.findOne({ where: { refreshToken } });

    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized('Token validation failed');
    }

    const user = (await models.User.findOne({ where: { id: userData.userId } })) as User;
    const tokens = tokenService.generateTokens({ userId: Number(user.id), userName: user.email });
    await tokenService.saveToken({ userId: Number(user.id), refreshToken: tokens.refreshToken }, true);
    
    return {
      ...tokens,
      user,
    };
  };

  logout = async (refreshToken: string): Promise<void> => {
    await tokenService.removeToken(refreshToken);
  };
}

export default new AuthService();
