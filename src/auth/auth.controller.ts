import { Controller, Post, Get, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // POST /auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    return this.authService.signUp(dto, req, res)
  }

  // POST /auth/signin
  @Post('signin')
  signin(@Body() dto: AuthDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.signIn(dto, req, res);
  }

  // GET /auth/signout
  @Get('signout')
  signout(@Req() req: Request, @Res() res: Response) {
    return this.authService.signOut(req, res);
  }
}
