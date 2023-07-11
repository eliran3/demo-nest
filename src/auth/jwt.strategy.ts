import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtTokenSecret } from 'utils/constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
      ]),
      secretOrKey: jwtTokenSecret,
    });
  }

  private static extractJWT(req: Request): string | null {
    return (req.cookies && 'Bearer' in req.cookies) ? req.cookies.token : null;
  }

  async validate(payload: { id: string; email: string }) {
    return payload;
  }
}
