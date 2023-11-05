import File, { FileMap } from './files.model.js';
import database from '../database.js';
import User, { UserMap } from './users.model.js';
import Token, { TokenMap } from './tokens.model.js';

FileMap(database);
UserMap(database);
TokenMap(database);

User.hasOne(Token, {
  as: 'token',
  sourceKey: 'id',
  onDelete: 'cascade',
});
Token.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
  onDelete: 'cascade',
});

User.hasMany(File, {
  as: 'file',
  sourceKey: 'id',
  onDelete: 'cascade',
});
File.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
  onDelete: 'cascade',
});

export default {
  File,
  User,
  Token,
};
