import jwt from 'jsonwebtoken';
import express, {NextFunction} from "express";
import models from '../models/index.js';
import User from '../models/users.model.js';
import { IRequest } from '../interfaces/IRequest.js';
import { IJwtPayload } from '../interfaces/IJwtPayload.js';

export default async function (req: IRequest, res: express.Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const { refreshToken } = req.cookies;
        const token = req.headers['x-access-token'] || req.headers.Authorization || req.headers.authorization;
        if (!token && !refreshToken) {
            return res.status(401).json({ message: 'Access denied. No token provided!' });
        }

        const decoded = jwt.verify(String(token), String(process.env.JWT_ACCESS_SECRET)) as IJwtPayload;
        const user = await models.User.findOne({ where: { id: decoded.userId } }) as User;

        req.user = user;
        next();
    } catch (e) {          
        res.status(401).json({ message: 'Invalid token' });
    }
};