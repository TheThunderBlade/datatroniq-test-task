import database from '../database.js';
import File, { FileMap } from './files.model.js';
import User, { UserMap } from './users.model.js';
import Token, { TokenMap } from './tokens.model.js';

FileMap(database);
UserMap(database);
TokenMap(database);

User.hasOne(Token, {
  foreignKey: 'userId',
  onDelete: 'cascade',
});

Token.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(File, {
  foreignKey: 'userId',
  onDelete: 'cascade',
});

File.belongsTo(User, {
  foreignKey: 'userId',
});

export default {
  File,
  User,
  Token,
};
