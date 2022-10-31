import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  constructor(tokenData?: Partial<TokenDto>) {
    Object.assign(this, tokenData);
  }

  @ApiProperty({
    type: String,
    example: 'identifier',
    description: 'identifier',
  })
  public identifier: string;

  @ApiProperty({ type: String, example: 'ETH', description: 'token symbol' })
  public symbol: string;

  @ApiProperty({ type: String, example: 'ETH', description: 'gas symbol' })
  public gas_symbol: string;

  @ApiProperty({ type: Number, example: 0.1, description: 'token decimals' })
  public decimals: number;

  @ApiProperty({ type: String, example: 'NFT', description: 'token type' })
  public type: string;

  @ApiProperty({ type: String, example: 'Ethereum', description: 'chain' })
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
