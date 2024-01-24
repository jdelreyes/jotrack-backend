import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Role } from 'src/auth/enum';

export class UserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsEnum(Role)
  role?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: number;
}
