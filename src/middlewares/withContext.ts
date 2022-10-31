import { NextFunction, Request } from 'express';

import { HEADER_REQUEST_ID, HEADER_SESSION_ID } from '../constant';
import { ctx, runWithCtx } from '../helpers/context';

export const withContext = (_req: Request, _res: Response, next: NextFunction) => {
  runWithCtx(async () => next(), {});
};

export const withRequestId = (request: Request, _res: Response, next: NextFunction) => {
  const context = ctx();
  context.reqId = request.header(HEADER_REQUEST_ID);
  context.sessionId = request.header(HEADER_SESSION_ID);
  return next();
};
