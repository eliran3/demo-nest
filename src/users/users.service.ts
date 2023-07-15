import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getOwnUser(id: number, req: Request): Promise<any> {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!userExists) {
      throw new NotFoundException();
    }

    // const decodedUser = req.user as { id: number };
    // if (userExists?.id !== decodedUser.id) {
    //   throw new ForbiddenException();
    // }

    return {
      user: {
        id: userExists.id,
        email: userExists.email,
        createdAt: userExists.createdAt,
      },
    };
  }
}
