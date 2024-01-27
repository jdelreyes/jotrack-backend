import { IsArray, IsNotEmpty, IsPostalCode, IsString } from 'class-validator';

export class CreateJobRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  position: string;
  @IsArray()
  @IsNotEmpty()
  requirements: string[];

  @IsString()
  @IsNotEmpty()
  companyName: string;

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
