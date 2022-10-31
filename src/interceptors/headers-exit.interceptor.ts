import { Request, Response as EResponse } from 'express';
import { Observable, tap } from 'rxjs';

import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HEADER_TIME_ENTRY, HEADER_TIME_EXECUTE, HEADER_TIMESTAMP_ENTRY, HEADER_TIMESTAMP_EXIT } from '../constant';
import { Logger } from '../modules/Logger';

export interface Response<T> extends EResponse<T, any> {
  data: T;
}

@Injectable()
export class HeadersExitInterceptor<T = any, R = any>
  implements NestInterceptor<T, R>
{
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  private static handleHeadersBeforeExit(context: ExecutionContext) {
    const hostType = context.getType();
    // TODO: implement all host types we use
    if (hostType === 'http') {
      // get time-end ASAP
      const timestampExit = Date.now();
      // handle Execute time
      const httpContext = context.switchToHttp();
      const request: Request = httpContext.getRequest<Request>();
      const timestampEntry = request.header(HEADER_TIMESTAMP_ENTRY);
      const timestampEntryNumber = Number(timestampEntry);
      const timeEntry = new Date(timestampEntryNumber).toISOString();
      const timeExecute = timestampExit - Number(timestampEntryNumber);
      // set response timers headers
      const response: Response<any> = httpContext.getResponse<Response<any>>();
      response.header(HEADER_TIMESTAMP_ENTRY, timestampEntry);
      response.header(HEADER_TIMESTAMP_EXIT, String(timestampExit));
      response.header(HEADER_TIME_ENTRY, timeEntry);
      response.header(HEADER_TIME_EXECUTE, String(timeExecute));
    }
  }

  // mistake of TS rxjs 0: CallHandler wants T but should be R only
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | R>,
  ): Observable<R> {
    return next.handle().pipe(
      tap<T | R>({
        next: (): void => {
          HeadersExitInterceptor.handleHeadersBeforeExit(context);
        },
        error: (): void => {
          HeadersExitInterceptor.handleHeadersBeforeExit(context);
        },
      }),
    ) as Observable<R>;
  }
}
