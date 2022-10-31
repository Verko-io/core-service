import { DateTime } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export default class GetTransactionResultDto {
  @ApiProperty({ type: String, example: '' })
  public id: string;

  @ApiProperty({ type: String, example: '' })
  public status: string;

  @ApiProperty({ type: String, example: '' })
  public sender: string;

  @ApiProperty({ type: String, example: '' })
  public data: string;

  @ApiProperty({ type: String, example: new Date().toISOString() })
  public utc_created: DateTime;

  @ApiProperty({ type: String, example: '' })
  public description: string;

  @ApiProperty({ type: Boolean, example: true })
  public get pending(): boolean {
    return this.status.toLowerCase() == 'pending';
  }

  @ApiProperty({ type: Boolean, example: false })
  public get success(): boolean {
    return this.status.toLowerCase() == 'success';
  }
}
