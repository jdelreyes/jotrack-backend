import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from 'src/auth/enum';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEnum(RoleEnum)
  role?: string;

  @IsEmail()
  @IsNotEmpty()
  firstName: string;
  @IsEmail()
  @IsNotEmpty()
  lastName: string;
}
