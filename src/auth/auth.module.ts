import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptModule } from 'utils/bcrypt/crypt.module';
import { JwtActionsModule } from 'utils/jwt/Jwt-actions.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CryptService } from 'utils/bcrypt/crypt.service';
import { JwtActionsService } from 'utils/jwt/Jwt-actions.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CryptModule, JwtActionsModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, CryptService, JwtActionsService, JwtService],
})
export class AuthModule {}
