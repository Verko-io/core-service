import { AxiosError } from 'axios';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ErrorResponseDto } from '../dto/response.dto';
import { EnvEnum } from '../enums/env.enum';
import {
  HEADER_REQUEST_ID,
  HEADER_SESSION_ID,
  HEADER_TIME_EXECUTE,
  HEADER_TIMESTAMP_ENTRY,
  HEADER_TIMESTAMP_EXIT
} from '../constant';
import { Logger } from '../modules/Logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    protected readonly configService: ConfigService,
  ) {}

  catch(exception: any | Error | AxiosError, host: ArgumentsHost): void {
    const isProd =
      this.configService.get<EnvEnum>('NODE_ENV') === EnvEnum.production;
    const isStage =
      this.configService.get<EnvEnum>('NODE_ENV') === EnvEnum.staging;
    const hideStack = isProd || isStage;
    const hostType = host.getType();
    // TODO: implement all host types we use
    // 'http' | 'ws' | 'rpc'
    // OR host.switchToHttp() anyway
    if (hostType === 'http') {
      const contextHttp = host.switchToHttp();

      let httpStatus: number;
      if (exception.isAxiosError) {
        httpStatus =
          exception?.response?.status ||
          exception?.response?.data?.status_code ||
          exception?.request?.res?.statusCode;
      } else {
        httpStatus =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
      }

      const request: Request = contextHttp.getRequest<Request>();

      let errorMessage, error;

      error = exception.toString();
      if (exception.isAxiosError) {
        errorMessage = exception?.response?.data?.message;
      } else {
        errorMessage = exception.message;
      }
      if (isProd || isStage) {
        if (
          exception.message &&
          exception.message.startsWith('connect ECONNREFUSED') &&
          !exception.message.endsWith('Service')
        ) {
          errorMessage = 'connect ECONNREFUSED';
          error = 'ECONNREFUSED';
        }
        // TODO: for dev could be turned on
        // } else {
        //   error = exception;
      }

      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;

      const response: Response = contextHttp.getResponse<Response>();
      const reqId = response.get(HEADER_REQUEST_ID);
      const sessionId = response.get(HEADER_SESSION_ID);
      const timestampEntry = response.get(HEADER_TIMESTAMP_ENTRY);
      const timestampExit = response.get(HEADER_TIMESTAMP_EXIT);
      const timeExecute = response.get(HEADER_TIME_EXECUTE);
      // const protocolName = response.get(HEADER_PROTOCOL);

      // TODO: m.b. use plainToClass but seems no benefits
      const responseBody: ErrorResponseDto = plainToClass(ErrorResponseDto, {
        statusCode: httpStatus,
        error: error,
        message: errorMessage || exception.message || exception,
        stack: hideStack ? undefined : exception.stack,
        timestampEntry: timestampEntry,
        timestampExit: timestampExit,
        timeExecute: timeExecute,
        path: httpAdapter.getRequestUrl(request),
        reqId,
        sessionId,
        // protocolName,
      });

      const newException = { ...exception, responseBody: responseBody };

      this.logger.error(
        newException,
        `${exception.stack || ''}\n${this.constructor.name}`,
        // this.constructor.name,
      );

      httpAdapter.reply(contextHttp.getResponse(), responseBody, httpStatus);
    } else {
      hideStack && delete exception.stack;
      throw exception;
    }
  }
}
