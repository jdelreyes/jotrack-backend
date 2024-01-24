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
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobRequestDto, JobResponseDto } from './dto';
import { AuthGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enum';

@Controller('/api/jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveJobs() {
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
    @Param() params: { jobId: string },
    @Body() jobRequestDto: JobRequestDto,
  ) {
    return this.jobService.updateJob(parseInt(params.jobId, 10), jobRequestDto);
  }

  @Delete('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteJob(@Param() params: { jobId: string }) {
    return this.jobService.removeJob(parseInt(params.jobId, 10));
  }

  @Get('/:jobId')
  @HttpCode(HttpStatus.OK)
  public retrieveUser(@Param() params: { jobId: string }) {
    return this.jobService.retrieveJob(parseInt(params.jobId, 10));
  }
}
