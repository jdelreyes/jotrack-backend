import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLogInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
