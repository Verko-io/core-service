import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import defaults from '../defaults';

const logFileRE = /[a-zA-Z1-9_.]\.log/;

export type LogConfig = {
  logErrorFile?: string;
  logCombineLog?: string;
  level?: string;
};

export const logConfig: LogConfig = {
  logErrorFile: process.env.LOG_ERROR_FILE || defaults.LOG_ERROR_FILE,
  logCombineLog: process.env.LOG_COMBINED_FILE || defaults.LOG_COMBINED_FILE,
  level: process.env.LOG_LEVEL || defaults.LOG_LEVEL,
};

export const logsConfig = registerAs('logs', () => logConfig);

export const logsValidation = {
  LOG_ERROR_FILE: Joi.string() //
    .allow('')
    .pattern(logFileRE),
  LOG_COMBINED_FILE: Joi.string() //
    .allow('')
    .pattern(logFileRE),
  LOG_LEVEL: Joi.string() //
    .equal('debug', 'info')
    .default('info'),
  LOG_IN_JSON: Joi.string() //
    .allow('')
    .equal('true', 'false'),
};
