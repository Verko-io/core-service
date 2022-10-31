import { INestApplication, ValidationPipe } from '@nestjs/common';

export default function pipesBootstrap(app: INestApplication): INestApplication {
  app.useGlobalPipes(new ValidationPipe());
  return app;
}
