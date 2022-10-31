import { NestExpressApplication } from '@nestjs/platform-express';

import { headersMiddleware } from '../middlewares/headers.middleware';

export default function middlewaresBootstrap(app: NestExpressApplication): NestExpressApplication {
  app.use(headersMiddleware);
  return app;
}
