import { Application, Router } from 'express';
import multer from 'multer';
import docFileController from '../controllers/docFile.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const docFileRoutes = Router();

docFileRoutes.post(
  '/upload',
  upload.single('file'),
  <Application>authMiddleware,
  <Application>docFileController.uploadFile,
);
docFileRoutes.get('/getFileData/:id', <Application>authMiddleware, <Application>docFileController.getFileDataById);
docFileRoutes.get('/getFileList', <Application>authMiddleware, <Application>docFileController.getFileList);
docFileRoutes.delete('/deleteFile/:id', <Application>authMiddleware, <Application>docFileController.deleteFile);

export default docFileRoutes;
