import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccountsService } from '../../modules/accounts/accounts.service';
import UserWalletDto from '../../dto/user-waller.dto';
import FindUserTokensParams from './find-user-tokens.params';
import { TokenBalanceDto } from '../../modules/tokens/dto/token-balance.dto';
import { HEADER_ACCESS_TOKEN } from '../../constant';

@ApiTags('Accounts')
@ApiBearerAuth(HEADER_ACCESS_TOKEN)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get(':user_id/tokens')
  @ApiParam({
    name: 'user_id',
    required: true,
    type: String,
    description: 'user id',
  })
  @ApiOkResponse({ type: TokenBalanceDto, isArray: true })
  async getTokenBalances(
    @Param() params: FindUserTokensParams,
  ): Promise<TokenBalanceDto[]> {
    return this.accountsService.findAllByUserId(params.user_id);
  }

  @Get(':user_id/wallets')
  @ApiParam({
    name: 'user_id',
    required: true,
    type: String,
    description: 'user id',
  })
  @ApiOkResponse({ type: UserWalletDto, isArray: true })
  public async getWallets(
    @Param('user_id') user_id: string,
  ): Promise<UserWalletDto[]> {
    return this.accountsService.findUserWalletsById(+user_id);
  }
}
