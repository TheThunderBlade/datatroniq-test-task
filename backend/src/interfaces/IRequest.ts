import { Request } from 'express';
import User from '../models/users.model.js';

export interface IRequest extends Request {
  user: User;
}
