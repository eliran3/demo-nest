import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/:id
  @Public()
  @Get(':id')
  getOwnUser(@Param('id') id: number, @Req() req: Request) {
    return this.usersService.getOwnUser(Number(id)!, req);
  }
}
