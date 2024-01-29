import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser, Roles } from 'src/auth/decorator';
import { AuthGuard, JwtGuard, RolesGuard } from 'src/auth/guard';
import { JobApplicationService } from './job-application.service';
import { Role } from 'src/auth/enum';
import { UserJobApplication } from '@prisma/client';
import {
  JobApplicationResponseDto,
  UpdateJobApplicationRequestDto,
} from './dto';
import { JobStatus } from './enum';

@Controller('/api/job-applications')
export class JobApplicationController {
  constructor(private jobApplicationService: JobApplicationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobApplications(): Promise<JobApplicationResponseDto[]> {
    return this.jobApplicationService.retrieveJobApplications();
  }

  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Get('/applications')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.USER)
  public retrieveOwnJobApplications(
    @GetUser('id') userId: number,
  ): Promise<UserJobApplication[]> {
    return this.jobApplicationService.retrieveOwnJobApplications(userId);
  }

  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Post('/:jobId')
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.USER)
  public applyToJob(
    @GetUser('id') userId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<UserJobApplication> {
    return this.jobApplicationService.applyJob(userId, jobId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Put('/accept')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  public acceptJobApplication(
    @Body() updateJobApplicationRequestDto: UpdateJobApplicationRequestDto,
  ): Promise<JobApplicationResponseDto> {
    return this.jobApplicationService.updateJobApplication(
      updateJobApplicationRequestDto,
      JobStatus.ACCEPTED,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Put('/reject')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  public rejectJobApplication(
    @Body() updateJobApplicationRequestDto: UpdateJobApplicationRequestDto,
  ): Promise<JobApplicationResponseDto> {
    return this.jobApplicationService.updateJobApplication(
      updateJobApplicationRequestDto,
      JobStatus.REJECTED,
    );
  }
}
