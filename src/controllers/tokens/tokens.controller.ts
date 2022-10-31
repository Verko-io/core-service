import { CacheInterceptor, CacheKey, CacheTTL, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TokensService } from '../../modules/tokens/tokens.service';
import { TokenDto } from '../../modules/tokens/dto/token.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import TokensRequest from './tokens.request';

@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

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
    // type: Number,
    description: 'elements from position',
  })
  @ApiQuery({
    name: 'size',
    required: true,
    // type: Number,
    description: 'count of elements',
  })
  @CacheKey('tokens')
  @CacheTTL(30)
  @UseInterceptors(CacheInterceptor)
  public async getTokens(@Query() query: TokensRequest): Promise<TokenDto[]> {
    return await this.tokensService.findAll(
      query.from,
      query.size,
      query.sender,
    );
  }
}
