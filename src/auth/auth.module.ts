import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptModule } from 'utils/bcrypt/crypt.module';
import { JwTokensModule } from 'utils/jwt/jwTokens.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [CryptModule, JwTokensModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
