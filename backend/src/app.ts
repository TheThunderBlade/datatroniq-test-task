import express from 'express';
import router from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

export default function createServer() {
  const app = express();

  app.use('/api', router);

  app.use(errorMiddleware);

  return app;
}
