import { ApiProperty } from '@nestjs/swagger';
import BuildTransactionDto from './build-transaction.dto';
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from 'class-validator';

export default class ExecuteTransactionDto {
  @ApiProperty({ type: String, example: '' })
  @IsNotEmpty()
  @IsString()
  public password: string;

  @ApiProperty({ type: BuildTransactionDto })
  @IsObject()
  @IsNotEmptyObject()
  public data: BuildTransactionDto;

  @ApiProperty({ type: String, example: '' })
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @ApiProperty({ type: String, example: '' })
  @IsNotEmpty()
  @IsString()
  public issuer: string;
}
