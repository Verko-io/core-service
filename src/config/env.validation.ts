import * as Joi from 'joi';

import { appValidation, databaseValidation, httpValidation, logsValidation } from './components';

export const validationSchema = Joi.object({
  ...appValidation,
  ...logsValidation,
  ...databaseValidation,
  ...httpValidation,
  // ...redisValidation,
});

export const validationOptions = {
  abortEarly: false,
};

export default validationSchema;
