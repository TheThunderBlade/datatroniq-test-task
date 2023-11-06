import express, { NextFunction } from 'express';
import authService from '../services/auth.service.js';

const maxAge = 30 * 24 * 60 * 60 * 1000;

class authController {
  registration = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { email, password, userName } = req.body;
      await authService.registration({ email, password, userName });

      return res.status(200).json({ message: 'User was successfully created' });
    } catch (e) {
      next(e);
    }
  };

  login = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;
      const userData = await authService.login({ userName, password });
      
      res.cookie('refreshToken', userData.refreshToken, { maxAge, httpOnly: true });
      
      return res.status(200).json({
        token: userData.accessToken,
        userId: userData.user.id,
        userName: userData.user.userName,
      });
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      
      const userData = await authService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge, httpOnly: true });

      return res.status(200).json({
        token: userData.accessToken,
        userId: userData.user.id,
        userName: userData.user.userName,
      });
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'User was successfully logged out' });
    } catch (e) {
      next(e);
    }
  };
}

export default new authController();
