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
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDto {
  @ApiProperty({
    type: String,
    description: 'email must be unique',
    example: 'email@domain.ca',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'email must be a valid email address and must be unique',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    enum: Role,
    description: 'role must be a string',
    example: 'user',
  })
  @IsString()
  @IsOptional()
  @IsEnum(Role)
  role?: string;

  @ApiProperty({
    type: String,
    description: 'firstName must be a string',
    example: 'firstName',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({
    type: String,
    description: 'lastName must be a string',
    example: 'lastName',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: Number,
    description: 'phoneNumber must be a number',
    example: 1234567890,
  })
  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @ApiProperty({
    type: String,
    description: 'postalCode must be a valid Canadian postal code',
    example: 'A1A 1A1',
  })
  @IsString()
  @IsNotEmpty()
  @IsPostalCode('CA')
  postalCode: string;
  @ApiProperty({
    type: String,
    description: 'street must be a string',
    example: 'street',
  })
  @IsString()
  @IsNotEmpty()
  street: string;
  @ApiProperty({
    type: String,
    description: 'city must be a string',
    example: 'city',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty({
    type: String,
    description: 'province must be a string',
    example: 'province',
  })
  @IsString()
  @IsNotEmpty()
  province: string;
  @ApiProperty({
    type: String,
    description: 'country must be a string',
    example: 'country',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}
