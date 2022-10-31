import { Integer } from '../../types';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export default class TokensRequest {
  @IsOptional()
  @IsString()
  sender?: string;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsInt()
  from: Integer = 1;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsInt()
  size: Integer = 100;
}
