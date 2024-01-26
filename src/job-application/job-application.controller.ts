import {
  Controller,
  Get,
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

@Controller('/api/job-applications')
export class JobApplicationController {
  constructor(private jobApplicationService: JobApplicationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobApplications() {
    return this.jobApplicationService.retrieveJobApplications();
  }

  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Get('/applications')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.USER)
  public retrieveOwnJobApplications(@GetUser('id') userId: number) {
    return this.jobApplicationService.retrieveOwnJobApplications(userId);
  }

  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
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
