import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CryptService } from 'utils/bcrypt/crypt.service';
import { JwTokensService } from 'utils/jwt/jwTokens.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private cryptService: CryptService,
    private jwTokenService: JwTokensService
  ) {}

  async signUp(dto: AuthDto, req: Request, res: Response): Promise<any> {
    const { email, password } = dto;

    const foundUser = await this.prismaService.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('This email already exists');
    }

    const cryptedPassword = await this.cryptService.cryptPassword(password);

    await this.prismaService.user.create({
      data: {
        email,
        cryptedPassword
      }
    });

    const token = await this.jwTokenService.signToken({ id: foundUser.id, email: foundUser.email });
    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('Bearer', token);

    return res.sendStatus(200);
  }

  async signIn(dto: AuthDto, req: Request, res: Response): Promise<any> {
    const { email, password } = dto;

    const foundUser = await this.prismaService.user.findUnique({ where: { email } });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isMatch = await this.cryptService.comparePasswords({ password, hash: foundUser.hashedPassword })
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.jwTokenService.signToken({ id: foundUser.id, email: foundUser.email });
    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('Bearer', token);

    return res.sendStatus(200);
  }

  async signOut(req: Request, res: Response) {
    res.clearCookie('Bearer');
    return res.sendStatus(200);
  }
}
