import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsPostalCode, IsString } from 'class-validator';

export class UpdateJobRequestDto {
  @ApiPropertyOptional({
    type: String,
    description: 'title must be a string',
    example: 'title',
  })
  @IsString()
  @IsOptional()
  title: string;
  @ApiPropertyOptional({
    type: String,
    description: 'description must be a string',
    example: 'description',
  })
  @IsString()
  @IsOptional()
  description: string;
  @ApiPropertyOptional({
    type: String,
    description: 'position must be a string',
    example: 'position',
  })
  @IsString()
  @IsOptional()
  position: string;
  @ApiPropertyOptional({
    isArray: true,
    description: 'requirements must be an array',
    example: ['some', 'requirements'],
  })
  @IsArray()
  @IsOptional()
  requirements: string[];

  @ApiPropertyOptional({
    type: String,
    description: 'companyName must be a string',
    example: 'companyName',
  })
  @IsString()
  @IsOptional()
  companyName: string;

  @ApiPropertyOptional({
    type: String,
    description: 'postalCode must be a valid Canadian postal code',
    example: 'A1A 1A1',
  })
  @IsString()
  @IsPostalCode('CA')
  @IsOptional()
  postalCode: string;
  @ApiPropertyOptional({
    type: String,
    description: 'street must be a string',
    example: 'street',
  })
  @IsString()
  @IsOptional()
  street: string;
  @ApiPropertyOptional({
    type: String,
    description: 'city must be a string',
    example: 'city',
  })
  @IsString()
  @IsOptional()
  city: string;
  @ApiPropertyOptional({
    type: String,
    description: 'province must be a string',
    example: 'province',
  })
  @IsString()
  @IsOptional()
  province: string;
  @ApiPropertyOptional({
    type: String,
    description: 'country must be a string',
    example: 'country',
  })
  @IsString()
  @IsOptional()
  country: string;
}
