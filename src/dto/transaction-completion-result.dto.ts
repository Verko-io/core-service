import { Verko } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import EnumTransactionStatus = Verko.Signer.EnumTransactionStatus;

export default class TransactionCompletionResultDto {
  public static error(error_message: string): TransactionCompletionResultDto {
    const result = new TransactionCompletionResultDto();
    result.is_error = true;
    result.error_message = error_message;
    return result;
  }

  @ApiProperty({ type: Boolean, example: false })
  public is_error: boolean;

  @ApiProperty({ type: String, example: '' })
  public error_message: string;

  @ApiProperty({ type: String, example: '' })
  public transaction_id: string;

  @ApiProperty({ type: Number, example: 0 })
  private status: number;

  public get transaction_status(): string {
    return EnumTransactionStatus[this.status];
  }

  public set transaction_status(value: string) {
    this.status = EnumTransactionStatus[value];
  }

  @ApiProperty({ type: Boolean, example: true })
  public get pending(): boolean {
    return this.status === EnumTransactionStatus.Pending;
  }

  @ApiProperty({ type: Boolean, example: false })
  public get success(): boolean {
    return this.status === EnumTransactionStatus.Success;
  }
}
