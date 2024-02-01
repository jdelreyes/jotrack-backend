import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateJobApplicationRequestDto {
  @ApiProperty({
    type: Number,
    description: 'userId must be a number and must be registered',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @ApiProperty({
    type: Number,
    description: 'jobId must be a number and must be registered',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  jobId: number;
}
