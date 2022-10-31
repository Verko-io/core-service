import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck, HealthCheckResult, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { toCamelCase } from '../../utils/string.utils';
import { Public } from '../../modules/auth/decorators/public.decorator';

/** example
 interface HealthCheckResult {
  status: HealthCheckStatus;
  info: HealthIndicatorResult;
  error?: HealthIndicatorResult;
  details?: HealthIndicatorResult;
}*/

export enum HealthStatusEnum {
  ok = 'ok',
  error = 'error',
  shuttingDown = 'shutting_down',
}

export enum ResultStatus {
  ok = 'ok',
  error = 'error',
}

export enum HealthServiceStatusEnum {
  up = 'up',
  down = 'down',
}

@Public()
@Controller('health')
export class HealthController {
  private readonly serviceName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {
    this.serviceName = this.configService.get<string>('SERVICE_NAME', 'core');
  }

  @Get()
  @HealthCheck()
  check(): HealthCheckResult {
    return {
      status: HealthStatusEnum.ok,
      // status: HealthStatusEnum.shuttingDown,
      info: {
        [toCamelCase(`${this.serviceName}Service`)]: {
          status: HealthServiceStatusEnum.up,
        },
      },
      error: null, // TODO: TBD undefined = no property field
      details: {
        [toCamelCase(`${this.serviceName}Service`)]: {
          status: HealthServiceStatusEnum.up,
          message: 'Service is OK',
          // message: new ServiceUnavailableException(),
        },
      },
    };
  }
}
