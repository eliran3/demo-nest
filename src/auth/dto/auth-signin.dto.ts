import { IsEmail, Length } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  public email?: string;

  @Length(5, 15, { message: 'Password should be between 5 to 15 chars long' })
  public password?: string;
}
