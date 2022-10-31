import { NextFunction, Request, Response } from 'express';

import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '../modules/Logger';
import {
  HEADER_REQUEST_ID,
  HEADER_SESSION_ID,
  HEADER_TIME_EXECUTE,
  HEADER_TIMESTAMP_ENTRY,
  HEADER_TIMESTAMP_EXIT
} from '../constant';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const originalUrl =
      req.originalUrl + req.params ? JSON.stringify(req.params) : '';
    const msg = req.originalUrl;
    this.logger.time(originalUrl);
    const reqId = req.get(HEADER_REQUEST_ID);
    const sessionId = req.get(HEADER_SESSION_ID);
    res.once('finish', () =>
      this.logger.timeEnd(originalUrl, msg, {
        reqId,
        sessionId,
        timestampEntry:
          req.get(HEADER_TIMESTAMP_ENTRY) || res.get(HEADER_TIMESTAMP_ENTRY),
        timestampExit: res.get(HEADER_TIMESTAMP_EXIT),
        timeExecute: res.get(HEADER_TIME_EXECUTE),
      }),
    );

    this.logger.log(
      {
        reqId: reqId || 'unknown',
        sessionId: sessionId,
        timestampEntry: req.get(HEADER_TIMESTAMP_ENTRY),
        // ip: req.ip,
        // ips: req.ips,
        method: req.method,
        hostname: req.hostname,
        baseUrl: req.baseUrl,
        url: req.url,
        body: req.body,
        // path: req.path, // included in url
        // params: req.params, // params usually empty
      },
      req.method,
    );
    next();
  }
}
