import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobDto } from './dto/jobDto';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  public async retrieveJobs(): Promise<{ id: number }[]> {
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

  public async updateJob(jobDto: JobDto) {
    // const retrievedJob = await this.prismaService.job.findU

    // const updatedJob = await this.prismaService.job.update({where: {
    //   id:
    // }})
    return 'some';
  }

  public async deleteJob() {}
}
