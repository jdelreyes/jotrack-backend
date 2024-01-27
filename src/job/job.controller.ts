import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  CreateJobRequestDto,
  JobResponseDto,
  UpdateJobRequestDto,
} from './dto';
import { AuthGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';

@Controller('/api/jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobs(
    @Query('filter') filter: string,
  ): Promise<JobResponseDto[]> {
    if (filter === 'dateTime')
      return this.jobService.retrieveJobsByDateTimePosted();
    return this.jobService.retrieveJobs();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  public createJob(
    @Body() createJobRequestDto: CreateJobRequestDto,
  ): Promise<JobResponseDto> {
    return this.jobService.createJob(createJobRequestDto);
  }

  @Put('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  public updateJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateJobRequestDto: UpdateJobRequestDto,
  ): Promise<JobResponseDto> {
    return this.jobService.updateJob(jobId, updateJobRequestDto);
  }

  @Delete('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteJob(@Param('jobId', ParseIntPipe) jobId: number): Promise<void> {
    return this.jobService.removeJob(jobId);
  }

  @Get('/:jobId')
  @HttpCode(HttpStatus.OK)
  public retrieveUser(
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<JobResponseDto> {
    return this.jobService.retrieveJob(jobId);
  }
}
