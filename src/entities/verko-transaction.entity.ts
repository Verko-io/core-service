import TransactionOperationEntity from './transaction-operation.entity';
import { DateTime, Integer } from '../types';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Verko } from '../enums';
import EnumTransactionStatus = Verko.Signer.EnumTransactionStatus;

@Entity('verko_transaction')
export default class VerkoTransactionEntity {
  // @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ type: 'text', primary: true })
  public id: string;

  @Column({ type: 'text' })
  public sender: string;

  @Column({
    type: 'enum',
    enum: EnumTransactionStatus,
    enumName: 'EnumTransactionStatus',
  })
  public status: EnumTransactionStatus;

  @Column({ type: 'text' })
  public description: string;

  @Column({ name: 'utc_created', type: 'timestamp with time zone' })
  public utcCreated: DateTime;

  @Column({ name: 'utc_updated', type: 'timestamp with time zone' })
  public utcUpdated: DateTime;

  @OneToMany(
    () => TransactionOperationEntity,
    (TO) => TO.verkoTransactionId,
    // TODO TBD
    // {
    //   cascade: true,
    // },
  )
  public operations: Array<TransactionOperationEntity>;

  @Column({ type: 'text', default: '' })
  public body: string;

  @Column({ type: 'integer' })
  public current_operation_index: Integer = 0;

  @Column({ type: 'text', nullable: true })
  public message?: string;

  @Column({ type: 'text', nullable: true })
  public signature?: string;

  public appendOperation(operation: TransactionOperationEntity): void {
    operation.index = this.operations.length;
    this.operations.push(operation);
    operation.verkoTransactionId = this.id;
    operation.verkoTransaction = this;
  }

  public getCurrentOperation?(): TransactionOperationEntity {
    return this.operations.find((x) => x.index == this.current_operation_index);
  }
}
