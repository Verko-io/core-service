import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import { EnvEnum } from '../../enums/env.enum';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  env: process.env.ENV,
  name: process.env.SERVICE_NAME,
  host: process.env.SERVICE_HOST,
  port: Number(process.env.SERVICE_PORT),
}));

export const appValidation = {
  NODE_ENV: Joi.string()
    .equal(...Object.values(EnvEnum))
    .default('local'),
  ENV: Joi.string()
    .equal(
      '.env',
      '.env.production',
      '.env.production.local',
      '.env.development',
      '.env.development.local',
    )
    .required(),

  SERVICE_NAME: Joi.string().required(),
  SERVICE_HOST: Joi.string() //
    .allow('')
    .required(),
  SERVICE_PORT: Joi.number() //
    .default(3000)
    .required(),

  IDENTITY_HOST: Joi.string() //
    // .allow('')
    .pattern(/http(s)?:\/\/([a-z0-9.]){1,}/)
    .required(),
};
