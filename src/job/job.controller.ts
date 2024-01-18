import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('/api/jobs')
export class JobController {
  constructor(private jobService: JobService) {}
  @Get('/')
  getJobs() {
    return this.jobService.getJobs();
  }
}
