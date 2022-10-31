// import * as childProcess from 'child_process';
import { NestExpressApplication } from '@nestjs/platform-express';

import { withContext } from '../middlewares/withContext';

export default function contextBootstrap(app: NestExpressApplication): NestExpressApplication {
  app.use(withContext);

  // const revision = childProcess.execSync('git rev-parse HEAD').toString().trim();
  // console.log(revision);

  return app;
}
