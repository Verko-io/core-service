import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from '../../controllers/accounts/accounts.controller';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
