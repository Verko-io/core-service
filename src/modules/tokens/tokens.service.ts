import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenDto } from './dto/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import TokenDataRepository from '../../repositories/token-data.repository';
import { plainToClass } from 'class-transformer';
import TokenDataEntity from '../../entities/token-data.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenDataRepository)
    private readonly tokenDataRepository: TokenDataRepository,
  ) {}
  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  async findAll(
    from: number,
    size: number,
    sender?: string,
  ): Promise<TokenDto[]> {
    let skip = from - 1;
    if (skip < 0) {
      skip = 0;
    }
    if (size <= 0 || size > 1000) {
      size = 100;
    }
    // console.log(this.tokenDataRepository);
    const tokenData: TokenDataEntity[] =
      await this.tokenDataRepository.getTokens(skip, size);
    return tokenData.map((token) =>
      // new TokenDto({
      //   identifier: token.token_address,
      //   chain: token.chain,
      //   type: token.type.toString(),
      //   symbol: token.symbol,
      //   gas_symbol: token.gas_symbol,
      //   decimals: token.decimal_digits,
      //   description: token.description,
      //   icon: token.icon,
      // })
      plainToClass(TokenDto, {
        identifier: token.token_address,
        chain: token.chain,
        type: token.type.toString(),
        symbol: token.symbol,
        gas_symbol: token.gasSymbol,
        decimals: token.decimalDigits,
        description: token.description,
        icon: token.icon,
      }),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
