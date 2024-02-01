import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInRequestDto {
  @ApiProperty({
    type: String,
    description: 'email must be a valid email address and must be registered',
    example: 'email@domain.ca',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password must match',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
