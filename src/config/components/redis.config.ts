import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  ttl: Number(process.env.REDIS_CACHE_TTL),
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  auth: process.env.REDIS_AUTH,
}));

export const redisValidation = {
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_AUTH: Joi.string() //
    .allow('')
    .required(),
  REDIS_CACHE_TTL: Joi.number().default(300),
};
