import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobDto } from './dto/jobDto';
import { Job } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  public async retrieveJobs(): Promise<Job[]> {
    return await this.prismaService.job.findMany();
  }

  public async createJob(jobDto: JobDto) {
    try {
      const job = await this.prismaService.job.create({
        data: {
          ...jobDto,
        },
      });

      return job;
    } catch (error) {
      throw new BadRequestException('fields must be completed');
    }
  }

  public async updateJob(jobId: number, jobDto: JobDto) {
    try {
      const job = await this.prismaService.job.update({
        where: {
          id: jobId,
        },
        data: {
          ...jobDto,
        },
      });

      return job;
    } catch (error) {
      throw new BadRequestException('fields must be completed');
    }
  }

  public async removeJob(jobId: number) {
    try {
      await this.prismaService.job.delete({
        where: {
          id: jobId,
        },
      });
    } catch (error) {
      throw new NotFoundException('job does not exist');
    }
  }

  public async retrieveJob(jobId: number): Promise<Job> {
    try {
      const job = await this.prismaService.job.findUnique({
        where: { id: jobId },
      });

      return job;
    } catch (error) {
      throw new NotFoundException('job does not exist');
    }
  }
}
