import { DateTime, Decimal, Integer } from '../types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import TokenDataEntity from './token-data.entity';
import VerkoTransactionEntity from './verko-transaction.entity';
import { Verko } from '../enums';
import EnumTransactionOperationType = Verko.Signer.EnumTransactionOperationType;
import EnumTransactionStatus = Verko.Signer.EnumTransactionStatus;

@Entity('operation')
export default class TransactionOperationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  // @PrimaryColumn({ type: 'string', primary: true })
  public uid: string;

  @Column({ type: 'integer' })
  public token_data_id: Integer;

  // [ForeignKey("token_data_id")]
  @ManyToOne(() => TokenDataEntity)
  @JoinColumn({ name: 'token_data_id' })
  public tokenData: TokenDataEntity;

  @Column({ type: 'integer' })
  public token_id: Integer;

  @Column({ type: 'integer' })
  public index: Integer;

  @Column({ type: 'boolean' })
  public is_local: boolean;

  @Column({
    type: 'enum',
    enum: EnumTransactionOperationType,
    enumName: 'EnumTransactionOperationType',
  })
  public type: EnumTransactionOperationType;

  @Column({ name: 'sender_user_id', type: 'text' })
  public senderUserId: string;

  @Column({ name: 'receiver_user_id', type: 'text', nullable: true })
  public receiverUserId?: string;

  @Column({ name: 'receiver_address', type: 'text', nullable: true })
  public receiverAddress?: string;

  @Column({ name: 'sender_address', type: 'text', nullable: true })
  public senderAddress?: string;

  @Column({ name: 'utc_created', type: 'timestamp' })
  public utcCreated: DateTime;

  @Column({ name: 'utc_updated', type: 'timestamp' })
  public utcUpdated: DateTime;

  public status: EnumTransactionStatus;

  @Column({ type: 'decimal' })
  public value: Decimal;

  @Column({ name: 'verko_transaction_id', type: 'text' })
  public verkoTransactionId: string;

  // [ForeignKey("verko_transaction_id")]
  @ManyToOne(
    () => VerkoTransactionEntity,
    (VT) => VT.operations,
    // TODO TBD
    {
      cascade: ['remove'],
    },
  )
  @JoinColumn({ name: 'verko_transaction_id' })
  public verkoTransaction: VerkoTransactionEntity;

  @Column({ name: 'tx_hash', type: 'text', nullable: true })
  public txHash?: string;

  @Column({ type: 'text', nullable: true })
  public message?: string;

  @Column({ type: 'text', nullable: true })
  public body?: string;

  @Column({ type: 'text', nullable: true })
  public signature?: string;
}
