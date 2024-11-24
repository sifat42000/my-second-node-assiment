import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

function server() {
  mongoose.connect(config.database_url as string);
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}
server();
