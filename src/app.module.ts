import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { z } from 'zod';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    // TODO: need to find a better solution to make the ConfigModule more syntaticlly correct
    ConfigModule.forRoot({
      // validationSchema: z.object({
      //   ACCESS_TOKEN_SECRET: z.string({
      //     required_error: 'Access token is required',
      //   }),
      //   ACCESS_TOKEN_EXPIRATION: z.string({
      //     required_error: 'Access token expiration is required',
      //   }),
      //   REFRESH_TOKEN_SECRET: z.string({
      //     required_error: 'Refresh token is required',
      //   }),
      //   REFRESH_TOKEN_EXPIRATION: z.string({
      //     required_error: 'Access token expiration is required',
      //   }),
      // }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AppModule {}
