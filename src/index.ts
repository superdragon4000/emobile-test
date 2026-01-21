import { config } from 'dotenv';
import App from './app/app';
import PostgresDataSource from './database/dataSource/data.source';

config();

const appPort = process.env.EXPRESS_PORT;

(async () => {
  try {
    await PostgresDataSource.initialize();
    console.log('Database connection established...');
    App.listen(appPort, () => {
      console.log(`Listening on port ${appPort}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
})();
