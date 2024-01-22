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
import { JobDto } from './dto/jobDto';
import { AuthGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { RoleEnum } from 'src/auth/enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('/api/jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  retrieveJobs() {
    return this.jobService.retrieveJobs();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  createJob(@Body() jobDto: JobDto) {
    return this.jobService.createJob(jobDto);
  }

  @Put('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  updateJob(@Param() params: { jobId: string }, @Body() jobDto: JobDto) {
    return this.jobService.updateJob(parseInt(params.jobId, 10), jobDto);
  }

  @Delete('/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteJob(@Param() params: { jobId: string }) {
    return this.jobService.removeJob(parseInt(params.jobId, 10));
  }

  @Get('/:jobId')
  @HttpCode(HttpStatus.OK)
  retrieveUser(@Param() params: { jobId: string }) {
    return this.jobService.retrieveJob(parseInt(params.jobId, 10));
  }
}
