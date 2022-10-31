import UserWalletDto from './user-waller.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class GetUserResultDto {
  @ApiProperty({ type: Boolean, example: true })
  public is_error: boolean;

  @ApiProperty({ type: String, example: '' })
  public error_message: string;

  @ApiProperty({ type: String, example: '' })
  public user_id: string;

  @ApiProperty({ type: String, example: '' })
  public wallets: UserWalletDto[] = [new UserWalletDto()];

  @ApiProperty({ type: Boolean, example: true })
  public is_system_user: boolean;
}
