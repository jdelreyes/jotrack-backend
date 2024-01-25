import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser, Roles } from 'src/auth/decorator';
import { AuthGuard, JwtGuard, RolesGuard } from 'src/auth/guard';
import { JobApplicationService } from './job-application.service';
import { Role } from 'src/auth/enum';

@Controller('api/job-applications')
@UseGuards(AuthGuard, RolesGuard, JwtGuard)
export class JobApplicationController {
  constructor(private jobApplicationService: JobApplicationService) {}

  @Post('/:jobId')
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.USER)
  public applyToJob(
    @GetUser('id') userId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    return this.jobApplicationService.applyJob(userId, jobId);
  }
}
