import { Body, Controller, Get, HttpCode, HttpException, Post, Query } from '@nestjs/common';
import { TransactionsService } from '../../modules/transactions/transactions.service';
import GetTransactionResultDto from '../../dto/get-transaction-result.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import TransactionCompletionResultDto from '../../dto/transaction-completion-result.dto';
import ExecuteTransactionDto from '../../dto/execute-transaction.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import TransactionsRequest from './transactions.request';
import { plainToClass } from 'class-transformer';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @ApiQuery({
    name: 'sender',
    required: false,
    type: String,
    description: 'sender id',
  })
  @ApiQuery({
    name: 'from',
    required: true,
    type: Number,
    description: 'elements from position',
  })
  @ApiQuery({
    name: 'size',
    required: true,
    type: Number,
    description: 'count of elements',
  })
  @ApiQuery({ name: 'ids', required: false, type: String, description: 'IDs' })
  public async getTransactions(
    @Query() query: TransactionsRequest,
  ): Promise<GetTransactionResultDto[]> {
    const { from, sender, ids } = query;
    let { size } = query;
    let skip = from - 1;
    if (skip < 0) {
      skip = 0;
    }
    if (size <= 0 || size > 1000) {
      size = 100;
    }
    return await this.transactionsService.findAll(from, size, sender, ids);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'transaction id',
  })
  public async getTransaction(
    id: string,
  ): Promise<GetTransactionResultDto | NotFoundException> {
    const transaction = await this.transactionsService.findOne(id);
    if (transaction === null) {
      return new NotFoundException();
    }
    return transaction;
  }

  @Post()
  @HttpCode(201) // 201 is by default
  @ApiBody({ type: ExecuteTransactionDto })
  public async executeTransaction(
    @Body() input: ExecuteTransactionDto,
  ): Promise<TransactionCompletionResultDto | HttpException> {
    const { password, userId } = input;
    if (!password) {
      return new HttpException('Missing password', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.transactionsService.create(
        plainToClass(ExecuteTransactionDto, input),
        userId,
        password,
      );
    } catch (e) {
      return new HttpException(e.mediumDate, HttpStatus.BAD_REQUEST);
    }
  }
}
