import express, { NextFunction } from 'express';

class docFileController {
  uploadFile = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { file } = req;
      console.log(file);
      
      res.status(200).json({ message: 'OK!' })
    } catch (e) {
      next(e);
    }
  };
}

export default new docFileController();
