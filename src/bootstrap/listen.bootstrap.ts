import { INestApplication } from '@nestjs/common';

export default async function listenBootstrap(app: INestApplication): Promise<INestApplication> {
  const { SERVICE_PORT, SERVICE_HOST, NODE_ENV } = process.env;
  await app.listen(SERVICE_PORT, SERVICE_HOST);
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    process.on('warning', (e) => console.warn(e.stack));
  }
  // console.log(`Listening at http://localhost:${SERVICE_PORT}/api`);
  return app;
}
