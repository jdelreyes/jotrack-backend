import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto } from './dto/jobDto';

@Controller('/api/jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  @HttpCode(200)
  retrieveJobs() {
    return this.jobService.retrieveJobs();
  }

  @Post()
  @HttpCode(201)
  createJob(@Body() jobDto: JobDto) {
    return this.jobService.createJob(jobDto);
  }

  @Put(':jobId')
  @HttpCode(200)
  updateJob(@Param() params: { jobId: string }, @Body() jobDto: JobDto) {
    return this.jobService.updateJob(parseInt(params.jobId, 10), jobDto);
  }

  @Delete(':jobId')
  @HttpCode(204)
  deleteJob(@Param() params: { jobId: string }) {
    return this.jobService.deleteJob(parseInt(params.jobId, 10));
  }
}
