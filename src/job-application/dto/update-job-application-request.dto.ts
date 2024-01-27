import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateJobApplicationRequestDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  jobId: number;
}
