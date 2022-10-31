import { Byte, Integer } from '../types';
// import { Verko.Signer EnumBlockchainType, EnumTokenType } from '../enums';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Verko } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import Signer = Verko.Signer;

@Entity()
export default class TokenDataEntity {
  @ApiProperty({ type: Number, example: 1 })
  // @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ type: 'integer', primary: true })
  public id: Integer;

  @ApiProperty({
    type: String,
    example: '0x0000000000000000000000000000000000000000',
    description: 'token address',
  })
  @Column({ type: 'text' })
  public token_address: string;

  @ApiProperty({ type: String, example: 'Bitcoin', description: 'token name' })
  @Column({ type: 'text' })
  public name: string;

  @ApiProperty({ type: String, example: 'ETH', description: 'token chain' })
  @Column({ type: 'text' })
  public chain: string;

  @ApiProperty({ type: String, example: 'NFT', description: 'token type' })
  @Column({
    type: 'enum',
    enum: Signer.EnumTokenType,
    enumName: 'EnumTokenType',
  })
  public type: Signer.EnumTokenType;

  @ApiProperty({
    type: String,
    required: false,
    example: 'owner',
    description: 'owner',
  })
  @Column({ type: 'text' })
  public owner?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '0x0000000000000000000000000000000000000000',
    description: 'token address',
  })
  @Column({ type: 'text' })
  public address?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'https://example.com',
    description: 'token image url',
  })
  @Column({ type: 'text' })
  public icon?: string;

  @ApiProperty({
    name: 'decimal_digits',
    type: Number,
    example: 0.1,
    description: 'token decimals',
  })
  @Column({ type: 'bytea' })
  public decimalDigits: Byte;

  @ApiProperty({ type: String, example: 'ETH', description: 'token symbol' })
  @Column({ type: 'text' })
  public symbol: string;

  @ApiProperty({
    name: 'gas_symbol',
    type: String,
    example: 'ETH',
    description: 'gateway symbol',
  })
  @Column({ type: 'text' })
  public gasSymbol: string;

  @ApiProperty({
    type: String,
    example: 'some description',
    description: 'token description',
  })
  @Column({ type: 'text' })
  public description?: string;

  // TBD: explicit for instance?
  public getChain(): Signer.EnumBlockchainType {
    return Signer.EnumBlockchainType[this.chain];
  }
}
