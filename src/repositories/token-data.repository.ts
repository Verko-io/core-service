import { Repository } from 'typeorm';

import TokenDataEntity from '../entities/token-data.entity';

export default class TokenDataRepository extends Repository<TokenDataEntity> {
  public async getTokens(skip: number, take: number): Promise<TokenDataEntity[]> {
    return await this.find({
      skip,
      take,
    });
  }
}
