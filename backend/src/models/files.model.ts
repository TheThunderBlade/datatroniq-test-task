import { Model, Sequelize, DataTypes } from 'sequelize';

export default class File extends Model {
  public id?: number;
  public filePath!: string;
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
    },
    {
      sequelize,
      tableName: 'files',
      timestamps: true,
    },
  );
};
