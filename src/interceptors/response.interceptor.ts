import { Response as EResponse } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import {
  HEADER_REQUEST_ID,
  HEADER_SESSION_ID,
  HEADER_TIME_ENTRY,
  HEADER_TIME_EXECUTE,
  HEADER_TIMESTAMP_ENTRY,
  HEADER_TIMESTAMP_EXIT
} from '../constant';
import { Logger } from '../modules/Logger';
import { ResponseMetaDto } from '../dto/response.dto';

export interface Response<T> extends EResponse<T, any> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T = any, R = any>
  implements NestInterceptor<T, Response<R>>
{
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(
    context: ExecutionContext,
    // mistake of TS rxjs 0: CallHandler wants T but should be R only
    next: CallHandler<Response<R> | T>,
  ): Observable<Response<R>> {
    return next.handle().pipe(
      // Add Meta for response body
      map<Response<R>, Response<R>>((data: Response<R>) => {
        const hostType = context.getType();
        // TODO: implement all host types we use
        // 'http' | 'ws' | 'rpc'
        // const context = host.switchToWs();
        if (hostType === 'http') {
          const httpContext = context.switchToHttp();
          const response: Response<any> =
            httpContext.getResponse<Response<any>>();
          // init Meta Data
          const reqId = response.get(HEADER_REQUEST_ID);
          const sessionId = response.get(HEADER_SESSION_ID);
          const timestampEntry = response.get(HEADER_TIMESTAMP_ENTRY);
          const timestampExit = response.get(HEADER_TIMESTAMP_EXIT);
          const timeEntry = response.get(HEADER_TIME_ENTRY);
          const timeExecute = response.get(HEADER_TIME_EXECUTE);
          // const protocolName = response.get(HEADER_PROTOCOL);
          // create Meta Object
          const meta: ResponseMetaDto = {
            timestampEntry,
            timestampExit,
            timeEntry,
            timeExecute,
            reqId,
            sessionId,
          };
          // Log Response Meta only
          this.logger.log(
            {
              ...meta,
              type: 'RESPONSE',
              // protocolName: protocolName,
            },
            'RESPONSE',
          );
          return Object.assign(data, meta);
        } else {
          return data;
        }
      }) as any,
    );
  }
}
