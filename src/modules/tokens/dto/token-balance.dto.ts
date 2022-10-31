import { ApiProperty } from '@nestjs/swagger';

export class TokenBalanceDto {
  @ApiProperty({
    type: String,
    example: '0x6b175474e89094c44da98b954eedeac495271d0f',
    description: 'Token identifier',
  })
  public identifier: string;

  @ApiProperty({ type: String, example: 'DAI', description: 'token symbol' })
  public symbol: string;

  @ApiProperty({ type: String, example: 'ETH', description: 'gas symbol' })
  public gasSymbol: string;

  @ApiProperty({ type: Number, example: 0.1, description: 'token decimals' })
  public decimals: number;

  @ApiProperty({ type: String, example: 'NFT', description: 'token type' })
  public type: string;

  @ApiProperty({ type: Number, example: 1, description: 'token balance' })
  public balance: number;

  @ApiProperty({
    type: String,
    example: 'Etherium',
    description: 'token chain',
  })
  public chain: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com',
    description: 'token image url',
  })
  public icon: string;

  @ApiProperty({
    type: String,
    example: 'some description',
    description: 'token description',
  })
  public description: string;
}
