import express, { NextFunction } from 'express';
import docFileService from '../services/docFile.service.js';
import { IFile } from '../interfaces/IFile.js';
import { IRequest } from '../interfaces/IRequest.js';

class docFileController {
  uploadFile = async (req: IRequest, res: express.Response, next: NextFunction) => {
    try {
      const { user } = req;
      const file = req.file as IFile;

      await docFileService.uploadFile(file, user);

      res.status(200).json({ message: 'File successfully uploaded!' });
    } catch (e) {
      next(e);
    }
  };

  getFileDataById = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = await docFileService.getFileDataById(Number(id));

      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  };

  getFileList = async (req: IRequest, res: express.Response, next: NextFunction) => {
    try {
      const { user } = req;

      const data = await docFileService.getFileList(Number(user.id));

      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  };
}

export default new docFileController();
