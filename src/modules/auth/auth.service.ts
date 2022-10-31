import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JWTPayload {
  id: number;
  username: string;
  [key: string]: string | number;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // console.log('AuthService validateUser');
    // const user = await this.usersService.findOne(username);
    // console.log('user', user);
    // if (user && user.password === pass) {
    // TODO use DTO with Omit & @Exclude from Entity
    // return user;
    // const { password, ...userSafeData } = user;
    // return userSafeData;
    // }
    return null;
  }
}
