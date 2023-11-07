import * as fs from 'node:fs';
import models from '../models/index.js';
import ApiError from './error.service.js';
import User from '../models/users.model.js';
import { IFileList } from '../interfaces/IFileList.js';
import { excelMimetype } from '../utils/constants.js';
import { IFile } from '../interfaces/IFile.js';

class docFileService {
  uploadFile = async (file: IFile, user: User): Promise<void> => {
    const filePath: string = file.destination + file.filename;

    if (file.mimetype !== excelMimetype) {
      fs.unlinkSync(filePath);
      throw ApiError.badRequest('Allowed only .xlsx formats');
    }

    await models.File.create({ filePath, userId: user.id });
  };

  getFileDataById = async (id: number, userId: number): Promise<Buffer> => {
    const fileRecord = await models.File.findOne({ where: { id, userId } });
    if (!fileRecord) {
      throw ApiError.notFound('Record with this id was not found');
    }

    const file = fs.readFileSync(fileRecord.filePath);

    return file;
  };

  getFileList = async (userId: number): Promise<IFileList[]> => {
    const fileRecords = await models.File.findAll({ where: { userId }, include: [User] });
    const formatedRecords = fileRecords.map((file) => ({
      id: Number(file.id),
      fileName: file.filePath.split('/')[1],
      owner: file.User.userName,
    }));
    return formatedRecords;
  };

  deleteFileById = async (id: number, userId: number): Promise<void> => {
    const fileRecord = await models.File.findOne({ where: { id, userId } });
    if (!fileRecord) {
      throw ApiError.notFound('Record with this id was not found');
    }

    fs.unlinkSync(fileRecord.filePath);
    await fileRecord.destroy();
  };
}

export default new docFileService();
