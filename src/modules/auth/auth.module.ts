import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtOpenIdStrategy } from './strategies/jwt-open-id-strategy.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SERCRET'),
        signOptions: {
          expiresIn: configService.get<number>('AUTH_TOKEN_TTL') || '600s',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtOpenIdStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
