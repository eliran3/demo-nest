import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { jwtTokenSecret } from 'utils/constants';

@Injectable()
export class JwTokensService {
  constructor(private jwtService: JwtService) {}

  async signToken(args: { id: string, email: string }) {
    const payload = structuredClone(args);
    return await this.jwtService.signAsync(payload, { secret: jwtTokenSecret })
  }
}