import { Controller, Post, Get, Body, Req, Res, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { Request, Response } from 'express';
import { TToken } from './types/token.type';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/signup
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthSignUpDto): Promise<TToken> {
    return this.authService.signUp(dto);
  }
  
  // POST /auth/signin
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthSignInDto): Promise<TToken> {
    return this.authService.signIn(dto);
  }
  
  // GET /auth/signout/:id
  @Get('signout/:id')
  @HttpCode(HttpStatus.OK)
  signout(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    return this.authService.signOut(id, req, res);
  }
  
  // POST /auth/refresh
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res() res: Response): Promise<TToken> {
    return this.authService.refreshTokens(req);
  }
}
