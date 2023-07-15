import { Module } from '@nestjs/common';
import { JwtActionsService } from './Jwt-actions.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtRefreshStrategy } from 'src/auth/strategies/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  providers: [JwtActionsService, JwtService, JwtStrategy, JwtRefreshStrategy],
})
export class JwtActionsModule {}
