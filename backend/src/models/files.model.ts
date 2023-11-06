import { Model, Sequelize, DataTypes } from 'sequelize';
import User from './users.model.js';

export default class File extends Model {
  public id?: number;
  public filePath!: string;
  public userId!: number;
  public User!: User;
}

export const FileMap = (sequelize: Sequelize) => {
  File.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      filePath: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'files',
      timestamps: true,
    },
  );
};
