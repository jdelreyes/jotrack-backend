import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enum';

export class SignUpRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
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
