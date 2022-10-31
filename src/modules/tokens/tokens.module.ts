import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from '../../controllers/tokens/tokens.controller';
import TokenDataEntity from '../../entities/token-data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import TokenDataRepository from '../../repositories/token-data.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TokenDataEntity, TokenDataRepository])],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
