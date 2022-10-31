import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { HEADER_ACCESS_TOKEN } from '../constant';

export default function swaggerBootstrap(app: INestApplication): INestApplication {
  const config = new DocumentBuilder()
    .setTitle(`Verko ${process.env.SERVICE_NAME} Service`)
    .setDescription(`Verko ${process.env.SERVICE_NAME} Service API description`)
    .setVersion('1.0')
    .addTag('Core')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, HEADER_ACCESS_TOKEN)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
}
