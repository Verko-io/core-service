import { Integer } from '../../types';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class TransactionsRequest {
  @IsNotEmpty()
  @IsInt()
  from: Integer = 1;

  @IsNotEmpty()
  @IsInt()
  size: Integer = 100;

  @IsOptional()
  @IsString()
  sender?: string;

  @IsOptional()
  @IsString()
  ids?: string = null;
}
