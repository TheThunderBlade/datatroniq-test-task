import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Token extends Model {
  public id?: number;
  public refreshToken!: string;
  public userId!: number;
}

export const TokenMap = (sequelize: Sequelize) => {
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tokens',
      timestamps: true,
    },
  );
};
