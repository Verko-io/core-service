import { join } from 'path';

import { appConfig, databaseConfig, httpConfig, logsConfig } from './components';
import { Config } from './configuration';
import validationSchema, { validationOptions } from './env.validation';

export const envFileDir = join(__dirname, '../../'); // level as `src`, not in

export const logFileDir = join(__dirname, '../../'); // level as `src`, not in

const config: Config = {
  envFileDir,
  logFileDir,
  validationSchema: validationSchema,
  validationOptions: validationOptions,
  load: [
    appConfig,
    databaseConfig,
    logsConfig,
    httpConfig,
    // redisConfig,
  ],
};

export default config;
