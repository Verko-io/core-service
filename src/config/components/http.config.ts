import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

export const httpConfig = registerAs('http', () => ({
  timeout: Number(process.env.HTTP_TIMEOUT),
  maxRedirects: Number(process.env.HTTP_MAX_REDIRECTS),
}));

export const httpValidation = {
  HTTP_TIMEOUT: Joi.number().default(60e3),
  HTTP_MAX_REDIRECTS: Joi.number().default(2),
};
