import { EnumWalletType } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export default class UserWalletDto {
  @ApiProperty({ type: String, example: 'ETH', description: 'wallet chain' })
  public chain: string;

  @ApiProperty({
    type: String,
    example: '0x0000000000000000000000000000000000000000',
    description: 'wallet address',
  })
  public address: string;

  @ApiProperty({
    enum: EnumWalletType,
    enumName: 'EnumWalletType',
    example: EnumWalletType.Custodial,
  })
  public type: EnumWalletType;
}
