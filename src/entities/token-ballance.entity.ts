import { Column, Entity, JoinTable, OneToOne, PrimaryColumn } from 'typeorm';
import { DateTime, Decimal, Integer } from '../types';
import TokenDataEntity from './token-data.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class TokenBallanceEntity {
  @ApiProperty({ type: Number, example: 1 })
  // @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ type: 'integer', primary: true })
  public id: Integer; // integer

  @ApiProperty({ type: String, example: '00000001', description: 'user id' })
  @Column({ type: 'text' })
  public user_id: string;

  @ApiProperty({
    type: String,
    example: '00000001',
    description: 'token data id',
  })
  @Column({ type: 'integer' })
  public token_data_id: Integer; // integer

  @ApiProperty({ type: String, example: '00000001', description: 'token id' })
  @Column({ type: 'integer' })
  public token_id: Integer; // integer

  @ApiProperty({ type: Number, example: 0.1, description: 'user balance' })
  @Column({ type: 'decimal' })
  public value: Decimal; // decimal

  @ApiProperty({ type: TokenDataEntity })
  // TODO: TBD relation
  @OneToOne(() => TokenDataEntity)
  @JoinTable({ name: 'token_data_id' })
  public tokenData: TokenDataEntity;

  @ApiProperty({
    type: String,
    example: '2020-01-01 00:00:00',
    description: 'changed at',
  })
  @Column({ type: 'timestamp' })
  public utc_changed: DateTime;

  @ApiProperty({
    type: String,
    example: 'some message',
    description: 'some message',
  })
  @Column({ type: 'text' })
  public message: string;

  @ApiProperty({
    type: String,
    example: 'signature',
    description: 'some signature',
  })
  @Column({ type: 'text' })
  public signature: string;
}
