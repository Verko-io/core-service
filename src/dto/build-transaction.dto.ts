import { Verko } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import EnumTransactionType = Verko.Signer.EnumTransactionType;

export default class BuildTransactionDto {
  private enumTransactionType: EnumTransactionType;

  // @ApiProperty({
  //   type: EnumTransactionType,
  //   enumName: 'EnumTransactionType',
  //   example: EnumTransactionType.NFT_TRNSFER,
  // })
  public get method(): string {
    return EnumTransactionType[this.enumTransactionType];
  }

  public set method(value: string) {
    this.enumTransactionType = EnumTransactionType[value];
  }

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  public chain: string;

  @ApiProperty({ type: String, example: '' })
  @IsOptional()
  @IsString()
  public description?: string;

  //NULL for native
  @ApiProperty({ type: String, example: '' })
  @IsOptional()
  @IsString()
  public token_address?: string;

  @ApiProperty({ type: Number, example: 0 })
  @IsOptional()
  @IsInt()
  public token_id?: number; // int

  @ApiProperty({ type: Number, example: 0 })
  @IsDecimal()
  public value: number; // dec

  @ApiProperty({ type: String, example: '' })
  @IsNotEmpty()
  @IsString()
  public receiver: string;

  @ApiProperty({ type: String, example: '' })
  @IsOptional()
  @IsString()
  public sender?: string;
  // public Method(): EnumTransactionType {
  //   return this.enumTransactionType;
  // }
}
