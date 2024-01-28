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

@Controller('/api/jobs')
export class JobController {
  constructor(
    private jobService: JobService,
    private eventEmitter2: EventEmitter2,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobs(
    @Query('filter') filter: string,
    @Query('title') title: string,
  ): Promise<JobResponseDto[]> {
    if (filter === 'dateTime')
      return this.jobService.retrieveJobsByDateTimePosted();
    if (title) {
      return this.jobService.retrieveJobsByJobTitle(title);
    }
    return this.jobService.retrieveJobs();
  }

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

  @Get('event/:jobId')
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Roles(Role.USER)
  @HttpCode(HttpStatus.OK)
  public retrieveUserEvent(
    @GetUser('id') userId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<JobResponseDto> {
    this.eventEmitter2.emit('job.visited', new JobVisitedEvent(userId, jobId));
    return this.jobService.retrieveJob(jobId);
  }

  @Get('/:jobId')
  @HttpCode(HttpStatus.OK)
  public retrieveUser(
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<JobResponseDto> {
    return this.jobService.retrieveJob(jobId);
  }
}
