import express from 'express';
import cookieParser from "cookie-parser";
import router from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

export default () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use('/api', router);

  app.use(errorMiddleware);

  return app;
}
