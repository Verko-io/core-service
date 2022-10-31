import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import GetTransactionResultDto from '../../dto/get-transaction-result.dto';
import ExecuteTransactionDto from '../../dto/execute-transaction.dto';
import TransactionCompletionResultDto from '../../dto/transaction-completion-result.dto';

@Injectable()
export class TransactionsService {
  async create(
    executeTransactionDto: ExecuteTransactionDto,
    userId: string,
    password: string,
  ): Promise<TransactionCompletionResultDto> {
    // await verkoTransMan.ExecuteTransaction(input.data, password);
    return new TransactionCompletionResultDto();
  }

  async findAll(
    from: number,
    size: number,
    sender?: string,
    ids?: string,
  ): Promise<GetTransactionResultDto[]> {
    // if (!sender) {
    //   q = q.Where(x => x.sender == sender);
    // }
    // if (!ids.trim()) {
    //   const idsList = ids.Split(',').Select(x => x.Trim()).ToList();
    //   q = q.Where(x => idsList.Contains(x.id));
    // }
    return [new GetTransactionResultDto()];
  }

  findOne(id: string): GetTransactionResultDto {
    return null;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
