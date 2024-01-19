import { Controller, Get, HttpCode } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('/api/jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  @HttpCode(200)
  retrieveJobs() {
    return this.jobService.retrieveJobs();
  }
}
