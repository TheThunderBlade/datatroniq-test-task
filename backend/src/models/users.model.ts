import { Model, Sequelize, DataTypes } from 'sequelize';

export default class User extends Model {
  public id?: number;
  public userName!: string;
  public email!: string;
  public password!: string;
}

export const UserMap = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
    },
  );
};
