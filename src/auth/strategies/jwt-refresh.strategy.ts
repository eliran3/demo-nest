import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { REFRESH_TOKEN_SECRET } from 'utils/constants';
import { Request } from 'express';

// const refreshTokenExtractor = (req: Request) => {
//   let token = "";
//   if (req && req.get('Token')) {
//     token = req.get('Token')?.replace('RefreshBearer', '')!.trim()!;
//     console.log(token);
//   }
//   return token;
// };

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // refreshTokenExtractor,
        ExtractJwt.fromAuthHeaderWithScheme('RefreshBearer')
      ]),
      secretOrKey: REFRESH_TOKEN_SECRET,
      passReqToCallBack: true, // returns also the refresh token
    });
  }

  async validate(req: Request, payload: { id: string; email: string }) {
    console.log(req);
    return {
      ...payload,
    };
  }
}
