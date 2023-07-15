import { IsEmail, Length } from 'class-validator';

export class AuthSignUpDto {
  @IsEmail()
  public email?: string;

  @Length(5, 15, { message: 'Password should be between 5 to 15 chars long' })
  public password?: string;

  @Length(5, 15, { message: 'name should be between 5 to 15 chars long' })
  public name?: string;
}
