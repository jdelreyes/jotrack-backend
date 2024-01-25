import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobRequestDto, JobResponseDto } from './dto';
import { AuthGuard, JwtGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';

@Controller('/api/jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobs(@Query('filter') filter: string) {
    if (filter === 'dateTime') {
      return this.jobService.retrieveJobsByDateTimePosted();
    }
    return this.jobService.retrieveJobs();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  public createJob(
    @Body() jobResponseDto: JobRequestDto,
  ): Promise<JobResponseDto> {
    return this.jobService.createJob(jobResponseDto);
  }

  @Put('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  public updateJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() jobRequestDto: JobRequestDto,
  ) {
    return this.jobService.updateJob(jobId, jobRequestDto);
  }

  @Delete('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteJob(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.jobService.removeJob(jobId);
  }

  @Get('/:jobId')
  @HttpCode(HttpStatus.OK)
  public retrieveUser(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.jobService.retrieveJob(jobId);
  }

  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Roles(Role.USER)
  @Post('/apply/:jobId')
  @HttpCode(HttpStatus.CREATED)
  public apply(
    @GetUser('id') userId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    return this.jobService.apply(userId, jobId);
  }
}
