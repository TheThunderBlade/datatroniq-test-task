import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

export default () => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use(cors({
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    credentials: true,
    origin: process.env.CLIENT_URL
  }));

  app.use('/api', router);

  app.use(errorMiddleware);

  return app;
};
