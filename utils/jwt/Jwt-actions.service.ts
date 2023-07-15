import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { TJwtPayload } from 'src/auth/types/jwt-payload.type';
import { TToken } from 'src/auth/types/token.type';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from 'utils/constants';

@Injectable()
export class JwtActionsService {
  constructor(private jwtService: JwtService) {}

  async signTokensForCreation(id: Number, email: string): Promise<TToken> {
    const payload = { sub: id, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }),
      this.jwtService.signAsync(payload, {
        secret: REFRESH_TOKEN_SECRET,
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async decodeToken(token: string) {
    const payload: TJwtPayload = await this.jwtService.decode(token, { json: true })! as TJwtPayload;
    return { ...payload };
  }
}
