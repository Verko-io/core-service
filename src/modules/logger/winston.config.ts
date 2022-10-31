import * as winston from 'winston';
import * as Transport from 'winston-transport';

import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';

import { logConfig, LogConfig } from '../../config/components';
import { ensureDotEnvInitiated } from '../../config/configuration';
import defaults from '../../config/defaults';
import { ctx } from '../../helpers/context';

export type WinstonLogConfig = LogConfig & {
  serviceName: string;
  defaultMeta?: Record<string, any>;
};

const createBaseTransports = (logErrorFile?: string, logCombineLog?: string): Transport[] => {
  const transports: Transport[] = [
    //Array<FileTransportInstance | ConsoleTransportInstance>
    new winston.transports.Console({
      format:
        process.env.LOG_IN_JSON?.toLowerCase() === 'true'
          ? winston.format.json()
          : // NestJS console like logs
            winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
    }),
  ];
  // - Write all logs with level `error` and below to `error.log`
  logErrorFile &&
    transports.push(
      new winston.transports.File({
        format: winston.format.json(),
        level: 'error',
        filename: logErrorFile,
      }),
    );
  // - Write all logs with level `info` and below to `combined.log`
  logCombineLog &&
    transports.push(
      new winston.transports.File({
        format: winston.format.json(),
        filename: logCombineLog,
      }),
    );

  return transports;
};

export const createWinstonConfig = ({
  logErrorFile,
  logCombineLog,
  serviceName,
  level = 'info',
  defaultMeta,
}: WinstonLogConfig): WinstonModuleOptions => {
  const transports: Transport[] = createBaseTransports(logErrorFile, logCombineLog);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const infoFormat = winston.format(<T>(info, _opts) => {
    const context = ctx();
    const reqId = info.reqId || context?.reqId;
    const sessionId = info.sessionId || context?.sessionId || undefined;
    if (reqId || sessionId) {
      info.meta = {
        reqId,
        sessionId,
      };
    }
    return info as T;
  });

  return {
    level: level,
    format: winston.format.combine(infoFormat(), winston.format.timestamp(), winston.format.json()),
    defaultMeta: Object.assign({ service: serviceName }, defaultMeta),
    transports,
  };
};

export const createLogger = (workFolder: string): LoggerService => {
  // NOTE: We should use .env initialization for logger as config service is not yet available
  // We should have logger before config validation as otherwise we cannot log it to CW
  ensureDotEnvInitiated(workFolder);

  const winstonConfig: WinstonLogConfig = {
    ...logConfig,
    // logErrorFile: join(workFolder, process.env.LOG_ERROR_FILE || defaults.LOG_ERROR_FILE),
    // logCombineLog: join(workFolder, process.env.LOG_COMBINED_FILE || defaults.LOG_COMBINED_FILE),
    // level: process.env.LOG_LEVEL || defaults.LOG_LEVEL,
    serviceName: process.env.SERVICE_NAME || defaults.SERVICE_NAME,
    defaultMeta: { env: process.env.ENV, service: process.env.SERVICE_NAME },
  };

  return WinstonModule.createLogger(createWinstonConfig(winstonConfig));
};

// TODO: TBD use or not config service for this
export const getWinstonParams = (configService?: ConfigService) =>
  createWinstonConfig({
    logErrorFile: configService.get<string>('LOG_ERROR_FILE', defaults.LOG_ERROR_FILE),
    logCombineLog: configService.get<string>('LOG_COMBINED_FILE', defaults.LOG_COMBINED_FILE),
    level: configService.get<string>('LOG_LEVEL', defaults.LOG_LEVEL),
    serviceName: configService.get<string>('SERVICE_NAME', defaults.SERVICE_NAME),
    defaultMeta: { env: configService.get<string>('ENV') },
  });
