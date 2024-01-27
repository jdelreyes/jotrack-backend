import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class UpdateUserRequestDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNumber()
  @IsOptional()
  phoneNumber?: number;

  @IsString()
  @IsPostalCode('CA')
  @IsOptional()
  postalCode?: string;
  @IsString()
  @IsOptional()
  street?: string;
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  province?: string;
  @IsString()
  @IsOptional()
  country?: string;
}
