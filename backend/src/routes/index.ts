import { Router } from 'express';
import docFileRoutes from './docFile.routes.js';

const router = Router();

router.use(docFileRoutes);

export default router;
