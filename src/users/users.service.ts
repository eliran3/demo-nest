import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async getOwnUser(id: string, req: Request): Promise<any> {
        const user = await this.prismaService.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException();
        }

        const decodedUser = req.user as { id: string };
        if (user?.id !== decodedUser.id) {
            throw new ForbiddenException();
        }

        delete user.hashedPassword;

        return { user };
    }
}
