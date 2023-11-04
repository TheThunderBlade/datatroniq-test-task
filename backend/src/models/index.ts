import File, { FileMap } from './files.model.js';
import database from '../database.js';

FileMap(database);

export default {
  File,
};
