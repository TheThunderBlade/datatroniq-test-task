import { Application, Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRoutes: Router = Router();

authRoutes.post('/signUp', authController.registration);
authRoutes.post('/signIn', authController.login);
authRoutes.get('/refresh', <Application>authMiddleware, authController.refresh);
authRoutes.get('/logout', <Application>authMiddleware, authController.logout);

export default authRoutes;
