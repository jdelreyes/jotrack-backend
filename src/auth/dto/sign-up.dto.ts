import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPostalCode,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enum';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsEnum(Role)
  role?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('CA')
  postalCode: string;
  @IsString()
  @IsNotEmpty()
  street: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  province: string;
  @IsString()
  @IsNotEmpty()
  country: string;
}
