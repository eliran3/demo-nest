import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";

export class AuthDto {
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 15, { message: 'Password should be between 5 to 15 chars long' })
    public password: string;
}
