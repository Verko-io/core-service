import { PrimaryGeneratedColumn } from 'typeorm';
import { DateTime } from '../../types';

export default class ErlondTransaction {
  @PrimaryGeneratedColumn('uuid')
  public verko_operation_uid: string;

  public status: string;

  public tx_hash?: string;

  public request: string;

  public response: string;

  public utc_created: DateTime;

  public utc_updated: DateTime;
}
