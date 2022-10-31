import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export default class FindUserTokensParams {
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
