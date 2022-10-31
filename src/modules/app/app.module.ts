import { CacheModule, Inject, MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from '../../controllers/app.controller';
import { AppService } from './app.service';
import { AccountsModule } from '../accounts/accounts.module';
import { TokensModule } from '../tokens/tokens.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '../../controllers/health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { Logger } from '../Logger';
import { LogRequestMiddleware } from '../../middlewares/log-request.middleware';
import configuration from '../../config/configuration';
import config from '../../config';
import { getWinstonParams } from '../Logger/winston.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { interceptorsOrder } from '../../interceptors';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '../../interceptors/all-exceptions.filter';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(configuration(config)),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        // TODO: TBD use or not config service for this
        getWinstonParams(configService),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: true,
      }),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    TerminusModule,
    AccountsModule,
    TokensModule,
    TransactionsModule,
  ],
  controllers: [HealthController, AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ...interceptorsOrder,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogRequestMiddleware).forRoutes('*');
  }

  onModuleInit(): void {
    const { ENV, SERVICE_NAME, SERVICE_PORT, SERVICE_HOST } = process.env;
    this.logger.log(
      {
        env: ENV,
        name: SERVICE_NAME,
        host: SERVICE_HOST,
        port: SERVICE_PORT,
      },
      'AppModule',
    );
  }
}
