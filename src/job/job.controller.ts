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

  // todo how do i have path param
  @Put(':id')
  @HttpCode(200)
  updateJob(@Param() id: string | number, @Body() jobDto: JobDto) {
    console.log(id, jobDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteJob(@Param() id: string | number, @Body() jobDto: JobDto) {
    console.log(id, jobDto);
  }
}
