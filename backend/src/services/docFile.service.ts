import * as fs from 'node:fs';
import excelToJson from 'convert-excel-to-json';
import { IFile } from '../interfaces/IFile.js';
import models from '../models/index.js';
import ApiError from './error.service.js';
import User from '../models/users.model.js';

class docFileService {
  uploadFile = async (file: IFile, user: User) => {
    const filePath: string = file.destination + file.filename;

    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      fs.unlinkSync(filePath);
      throw ApiError.badRequest('Allowed only .xlsx formats');
    }

    await models.File.create({ filePath, userId: user.id });
  };

  getFileDataById = async (id: number) => {
    const fileRecord = await models.File.findOne({ where: { id } });
    if (!fileRecord) {
      throw ApiError.notFound('Record with this id was not found');
    }

    const excelData = excelToJson({
      sourceFile: fileRecord.filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        '*': '{{columnHeader}}',
      },
    });

    return excelData;
  };
}

export default new docFileService();
