import express from 'express';
import router from './routes/index.js';


export default function createServer() {
  const app = express();

  app.use('/api', router);

  return app;
}
