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
import {
  JobApplicationResponseDto,
  UpdateJobApplicationRequestDto,
} from './dto';
import { JobStatus } from './enum';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @ApiResponse({ description: 'retrieves job applications' })
  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobApplications(): Promise<JobApplicationResponseDto[]> {
    return this.jobApplicationService.retrieveJobApplications();
  }

  @ApiResponse({ description: 'retrieves own job applications' })
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Get('/applications')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.USER)
  public retrieveOwnJobApplications(
    @GetUser('id') userId: number,
  ): Promise<JobApplicationResponseDto[]> {
    return this.jobApplicationService.retrieveOwnJobApplications(userId);
  }

  @ApiResponse({ description: 'applies to a job' })
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Post('/:jobId')
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.USER)
  public applyToJob(
    @GetUser('id') userId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<JobApplicationResponseDto> {
    return this.jobApplicationService.applyJob(userId, jobId);
  }

  @ApiResponse({ description: 'accepts a job application' })
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

  @ApiResponse({ description: 'rejects a job application' })
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
