import { Router } from 'express';
import multer from 'multer';
import docFileController from '../controllers/docFile.controller.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const docFileRoutes = Router();

docFileRoutes.post('/upload', upload.single('file'), docFileController.uploadFile);
docFileRoutes.get('/getFileData/:id', docFileController.getFileDataById);

export default docFileRoutes;
