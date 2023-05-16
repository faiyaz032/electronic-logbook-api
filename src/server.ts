import app from './app';
import connectDatabase from './config/database';
import log from './utils/logger';

const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, async () => {
  log.info(`Server is alive on PORT:${PORT}`);
  //connect to the database when our server starts successfully
  await connectDatabase();
});
