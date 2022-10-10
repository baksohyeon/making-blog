import { Get, Request, UseGuards } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

// JSON 웹 토큰으로 RESTful 엔드 포인트를 보호하기 위한 passport-jwt 전략을 제공

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, author: payload.author };
  }
}
