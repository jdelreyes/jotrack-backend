import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class UpdateUserRequestDto {
  @ApiPropertyOptional({
    type: String,
    description: 'email must be a valid email address and must be unique',
    example: 'email@domain.ca',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'firstName must be a string',
    example: 'firstName',
  })
  @IsString()
  @IsOptional()
  firstName?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'lastName must be a string',
    example: 'lastName',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'phoneNumber must be a number',
    example: 1234567890,
  })
  @IsNumber()
  @IsOptional()
  phoneNumber?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'postalCode must be a valid Canadian postal code',
    example: 'A1A 1A1',
  })
  @IsString()
  @IsPostalCode('CA')
  @IsOptional()
  postalCode?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'street must be a string',
    example: 'street',
  })
  @IsString()
  @IsOptional()
  street?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'city must be a string',
    example: 'city',
  })
  @IsString()
  @IsOptional()
  city?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'province must be a string',
    example: 'province',
  })
  @IsString()
  @IsOptional()
  province?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'country must be a string',
    example: 'country',
  })
  @IsString()
  @IsOptional()
  country?: string;
}
