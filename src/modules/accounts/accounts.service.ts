import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import GetUserResultDto from '../../dto/get-user-result.dto';
import TokenBallanceEntity from '../../entities/token-ballance.entity';
import UserWalletDto from '../../dto/user-waller.dto';
import { TokenBalanceDto } from '../tokens/dto/token-balance.dto';

@Injectable()
export class AccountsService {
  private async getChainBallance(
    user: GetUserResultDto,
    balance: TokenBallanceEntity,
  ): Promise<number> {
    return 0;
  }

  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findAllByUserId(user_id: number): Promise<TokenBalanceDto[]> {
    // console.log(`This action returns all accounts by user id #${user_id}`);
    return [new TokenBalanceDto()];
  }

  async findUserWalletsById(user_id: number): Promise<[UserWalletDto]> {
    // console.log(`This action returns all accounts by user id #${user_id}`);
    return [new UserWalletDto()];
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
