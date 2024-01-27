import { IsArray, IsOptional, IsPostalCode, IsString } from 'class-validator';

export class UpdateJobRequestDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  position: string;
  @IsArray()
  @IsOptional()
  requirements: string[];

  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsPostalCode('CA')
  @IsOptional()
  postalCode: string;
  @IsString()
  @IsOptional()
  street: string;
  @IsString()
  @IsOptional()
  city: string;
  @IsString()
  @IsOptional()
  province: string;
  @IsString()
  @IsOptional()
  country: string;
}
