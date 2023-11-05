import { Router } from 'express';
import docFileRoutes from './docFile.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use(docFileRoutes);
router.use(authRoutes);

export default router;
