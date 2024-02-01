import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsPostalCode, IsString } from 'class-validator';

export class CreateJobRequestDto {
  @ApiProperty({
    type: String,
    description: 'title must be a string',
    example: 'title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    type: String,
    description: 'description must be a string',
    example: 'description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({
    type: String,
    description: 'position must be a string',
    example: 'position',
  })
  @IsString()
  @IsNotEmpty()
  position: string;
  @ApiProperty({
    isArray: true,
    description: 'requirements must be an array',
    example: ['some', 'requirements'],
  })
  @IsArray()
  @IsNotEmpty()
  requirements: string[];

  @ApiProperty({
    type: String,
    description: 'companyName must be a string',
    example: 'companyName',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

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
