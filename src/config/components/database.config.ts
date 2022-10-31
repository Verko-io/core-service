import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // env args are stringified. Boolean('false') === true
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
}));

export const databaseValidation = {
  DB_HOST: Joi.string() //
    .required()
    .default('localhost'),
  DB_PORT: Joi.number() //
    .required()
    .default(5432),
  DB_USERNAME: Joi.string() //
    .required()
    .default('postgres'),
  DB_PASSWORD: Joi.string() //
    .required()
    .default('postgres'),
  DB_DATABASE: Joi.string().required(),

  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_LOGGING: Joi.boolean().default(true),
};
