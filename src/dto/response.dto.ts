// eslint-disable-next-line max-classes-per-file
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResultStatus } from '../controllers/health/health.controller';
import { DetailedResponse } from '../interfaces';

// import { DetailedResponse } from '@app/common/interfaces';

// import { ResultStatus } from '../enum';

export class MetaDto {
  @ApiProperty({
    type: Number,
    required: false,
    example: 123.412,
    description: 'time in ms',
  })
  requestTime?: number;
  @ApiProperty({
    type: Number,
    required: false,
    example: 123.412,
    description: 'time in ms',
  })
  queryTime?: number;
  @ApiProperty({
    type: Number,
    required: false,
    example: 123.412,
    description: 'time in ms',
  })
  fetchTime?: number;
}

export class DetailedResponseDto<T> implements DetailedResponse<T> {
  @ApiProperty({
    enum: ResultStatus,
    enumName: 'ResultStatus',
    example: ResultStatus.ok,
  })
  status: ResultStatus = ResultStatus.ok;
  @ApiProperty({
    type: [String],
    example: ['connect ECONNREFUSED ...'],
  })
  errors: Error[] | string[] | any[] = [];
  @ApiProperty({
    isArray: true,
    type: Object,
  })
  data: T;

  constructor(status: ResultStatus, errors: Error[] | string[], data: T) {
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

export class ResponseDto<T = any> extends DetailedResponseDto<T> {
  data: T;
}

export class ResponseMetaDto {
  @ApiProperty({
    type: String,
    example: '2022-06-09T09:40:42.335Z',
  })
  timeEntry: string;

  @ApiProperty({
    type: String,
    example: '1650579202013',
  })
  timestampEntry: string;

  @ApiProperty({
    type: String,
    example: '1650579202034',
  })
  timestampExit: string;

  @ApiProperty({
    type: String,
    example: '21',
  })
  timeExecute: string;

  @ApiProperty({
    type: String,
    description: 'uuid generated at the Gateway entry point',
    example: '5da02c35-b815-450d-9ce3-c0503b69e3ba',
  })
  reqId: string;

  @ApiProperty({
    type: String,
    description: 'uuid generated at the Gateway entry point',
    example: 'fab15d01-7cb6-4a14-ac4f-92785fa988c3',
    required: false,
  })
  sessionId: string;
}

export class ErrorResponseDto extends ResponseMetaDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    enum: HttpStatus,
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    type: String,
    example: 'connect ECONNREFUSED',
  })
  message: string;

  @ApiProperty({
    type: String,
    example: 'Error: Request failed with status code 500\n at createError...',
    required: false,
  })
  stack?: string;

  @ApiProperty({
    type: String,
    example:
      '/v2/protocols/UniswapV2/?addresses=0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85&chains=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11',
  })
  path: string;

  @ApiProperty({
    type: String,
    description: 'Provide Protocol name If ProtocolController',
    example: 'UniswapV2',
  })
  protocolName?: string;

  type?: string;
}
