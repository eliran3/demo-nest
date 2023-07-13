import { Module } from '@nestjs/common';
import { JwTokensService } from './jwTokens.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [JwTokensService]
})
export class JwTokensModule {}
