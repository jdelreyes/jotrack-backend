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
import { AuthGuard, JwtGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JobSearchedEvent, JobVisitedEvent } from './event';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/jobs')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly eventEmitter2: EventEmitter2,
  ) {}

  @ApiResponse({ description: 'retrieves jobs' })
  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobs(
    @Query('filter') filter: string,
    @Query('title') title: string,
  ): Promise<JobResponseDto[]> {
    if (filter === 'dateTime')
      return this.jobService.retrieveJobsByDateTimePosted();
    if (title) return this.jobService.retrieveJobsByJobTitle(title);
    return this.jobService.retrieveJobs();
  }

  @ApiResponse({ description: 'retrieve jobs by title and emits an event' })
  @Get('/event')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Roles(Role.USER)
  public retrieveJobsByJobTitle(
    @GetUser('id') userId: number,
    @Query('title') title: string,
  ): Promise<JobResponseDto[]> {
    this.eventEmitter2.emit(
      'job.searched',
      new JobSearchedEvent(userId, title),
    );
    return this.jobService.retrieveJobsByJobTitle(title);
  }

  @ApiResponse({ description: 'creates a job' })
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  public createJob(
    @Body() createJobRequestDto: CreateJobRequestDto,
  ): Promise<JobResponseDto> {
    return this.jobService.createJob(createJobRequestDto);
  }

  @ApiResponse({ description: 'updates a job' })
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

  @ApiResponse({ description: 'deletes a job' })
  @Delete('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteJob(@Param('jobId', ParseIntPipe) jobId: number): Promise<void> {
    return this.jobService.removeJob(jobId);
  }

  @ApiResponse({ description: 'retrieves a job and emits an event' })
  @Get('event/:jobId')
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Roles(Role.USER)
  @HttpCode(HttpStatus.OK)
  public retrieveJobEvent(
    @GetUser('id') userId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<JobResponseDto> {
    this.eventEmitter2.emit('job.visited', new JobVisitedEvent(userId, jobId));
    return this.jobService.retrieveJob(jobId);
  }

  @ApiResponse({ description: 'retrieves a job' })
  @Get('/:jobId')
  @HttpCode(HttpStatus.OK)
  public retrieveJob(
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<JobResponseDto> {
    return this.jobService.retrieveJob(jobId);
  }
}
