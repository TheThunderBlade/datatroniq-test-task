import User from '../models/users.model.js';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokensWithUser extends ITokens {
  user: User;
}
