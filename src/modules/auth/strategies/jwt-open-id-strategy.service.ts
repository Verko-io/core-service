import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { EnvEnum } from '../../../enums/env.enum';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtOpenIdStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const options: StrategyOptions = {
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() ||
        ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration:
        configService.get<string>('NODE_ENV') !== EnvEnum.production,
      issuer: configService.get<string>('IDENTITY_HOST'),
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // IDENTITY_HOST should end with '/'
        jwksUri: new URL(
          '.well-known/jwks.json',
          configService.get<string>('IDENTITY_HOST'),
        ).href,
      }),
    };
    super(options);
  }

  validate(payload: unknown): unknown {
    // console.log('validate - payload', payload);
    return payload;
  }
}
