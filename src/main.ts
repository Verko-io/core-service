import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import contextBootstrap from './bootstrap/context.bootstrap';
import listenBootstrap from './bootstrap/listen.bootstrap';
import loggerBootstrap from './bootstrap/logger.bootstrap';
import middlewaresBootstrap from './bootstrap/middlewares.bootstrap';
import pipesBootstrap from './bootstrap/pipes.bootstrap';
import prefixBootstrap from './bootstrap/prefix.bootstrap';
import swaggerBootstrap from './bootstrap/swagger.bootstrap';
import { envFileDir } from './config';
import { createLogger } from './modules/Logger/winston.config';
import { AppModule } from './modules/app/app.module';

const logger = createLogger(envFileDir);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
    abortOnError: false,
    logger,
  });

  middlewaresBootstrap(app);
  contextBootstrap(app);
  loggerBootstrap(app);
  prefixBootstrap(app);
  pipesBootstrap(app);
  swaggerBootstrap(app);

  await listenBootstrap(app);
}
bootstrap();
