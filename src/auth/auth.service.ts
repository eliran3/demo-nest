import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptService } from 'utils/bcrypt/crypt.service';
import { JwtActionsService } from 'utils/jwt/Jwt-actions.service';
import { Request, Response } from 'express';
import { TToken } from './types/token.type';
import { ACCESS_TOKEN_SALT, REFRESH_TOKEN_SALT } from 'utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private cryptService: CryptService,
    private jwtActionsService: JwtActionsService,
  ) {}

  async signUp(dto: AuthSignUpDto): Promise<TToken> {
    const { email, password, name } = dto;

    // check if user already exists
    const existingUserWithEmail = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingUserWithEmail) {
      throw new BadRequestException('This email already exists');
    }

    // bcrypting password
    const bcryptedPassword = await this.cryptService.bcrypt(
      ACCESS_TOKEN_SALT,
      password!,
    );

    // creating user
    const createdUser = await this.prismaService.user.create({
      data: {
        email: email!,
        name,
        passwordHash: bcryptedPassword,
      },
    });

    const tokens = await this.jwtActionsService.signTokensForCreation(
      createdUser.id,
      createdUser.email,
    );
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new ForbiddenException();
    }

    await this.updateUserRefreshToken(createdUser.id, tokens.refreshToken);

    // res.cookie('Bearer', tokens.access_token);
    // res.cookie('RefreshBearer', tokens.refresh_token);

    return tokens;
  }

  async signIn(dto: AuthSignInDto): Promise<TToken> {
    const { email, password } = dto;

    const chosenUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!chosenUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isMatchPasswords = await this.cryptService.compare(
      password as string,
      chosenUser.passwordHash,
    );
    if (!isMatchPasswords) {
      throw new BadRequestException('Wrong credentials');
    }

    const tokens = await this.jwtActionsService.signTokensForCreation(
      chosenUser.id,
      chosenUser.email,
    );
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new ForbiddenException();
    }

    await this.updateUserRefreshToken(chosenUser.id, tokens.refreshToken);

    // res.cookie('Bearer', tokens.access_token);
    // res.cookie('RefreshBearer', tokens.refresh_token);
    return tokens;
  }

  async signOut(id: number, req: Request, res: Response) {
    const existingRefreshToken = await this.prismaService.user.findUnique({
      where: {
        id: Number(id)!,
      },
      select: {
        refreshTokens: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
    if (!existingRefreshToken) {
      throw new BadRequestException('Something went wrong');
    }

    const latestRefreshToken = existingRefreshToken.refreshTokens[0].token;

    const deletedRefreshToken = await this.prismaService.refreshToken.delete({
      where: {
        userId: Number(id)!,
        token: latestRefreshToken!,
      },
    });
    if (!deletedRefreshToken) {
      throw new BadRequestException('Something went wrong');
    }

    return res.sendStatus(200);
  }

  async refreshTokens(req: Request): Promise<TToken> {
    const token = String(req.headers['authorization'])
      ?.replace('RefreshBearer', '')!
      .trim()!;

    const { sub, email } = await this.jwtActionsService.decodeToken(token);
    const id = Number(sub)!;

    const existingRefreshToken = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        refreshTokens: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
    if (!existingRefreshToken) {
      throw new BadRequestException('Something went wrong');
    }
    const latestRefreshToken = existingRefreshToken.refreshTokens[0].token;

    const isMatchTokens = await this.cryptService.compare(
      token,
      latestRefreshToken,
    );
    if (!isMatchTokens) {
      throw new ForbiddenException();
    }

    const tokens = await this.jwtActionsService.signTokensForCreation(
      id,
      email,
    );
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new ForbiddenException();
    }
    await this.updateUserRefreshToken(id, tokens.refreshToken);
    
    return tokens;
  }

  // helper function to update db with a refresh token to be linked to the user
  async updateUserRefreshToken(id: number, refresh_token: string) {
    const bcryptRefreshToken = await this.cryptService.bcrypt(
      REFRESH_TOKEN_SALT,
      refresh_token,
    );
    await this.prismaService.refreshToken.create({
      data: {
        userId: id,
        token: bcryptRefreshToken,
      },
    });
  }
}
