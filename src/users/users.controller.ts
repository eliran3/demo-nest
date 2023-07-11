import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/:id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOwnUser(@Param() params: { id: string }, @Req() req: Request) {
    return this.usersService.getOwnUser(params.id, req);
  }
}
