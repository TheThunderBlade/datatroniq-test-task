import createServer from './app.js';
import dotenv from 'dotenv';
import db from './database.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = createServer();

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    await db.sync();

    console.log(`App listening on port ${PORT}!`);
  } catch (e) {
    console.log(e);
  }
});
