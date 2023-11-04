import { Router } from 'express';
import multer from 'multer';
import { URL } from 'url';
import docFileController from '../controllers/docFile.controller.js';

const __dirname = new URL('.', import.meta.url).pathname;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.xlsx')
    }
});

const upload = multer({ storage });

const docFileRoutes = Router();

docFileRoutes.post('/upload', upload.single('file'), docFileController.uploadFile);

export default docFileRoutes;
