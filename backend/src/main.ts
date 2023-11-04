import createServer from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = createServer();

app.listen(PORT, async function () {
  try {
    console.log(`App listening on port ${PORT}!`);
  } catch (e) {
    console.log(e);
  }
});
