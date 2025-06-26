import app from './app';
import { config } from './utils/config/env';
import logger from './utils/logs/logger';

const port = config.PORT;

const main = () => {
  app.listen(port);
  logger.info(`🚀 Server running on http://localhost:${port}`);
};

main();

export default main;
