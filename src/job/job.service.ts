import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateJobRequestDto,
  JobResponseDto,
  UpdateJobRequestDto,
} from './dto';
import { Job } from '@prisma/client';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export class JobService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly openAIService: OpenAIService,
  ) {}

  public async retrieveJobs(): Promise<JobResponseDto[]> {
    return (await this.prismaService.job.findMany()).map((job: Job) =>
      this.mapToJobResponseDto(job),
    );
  }

  public async retrieveJobsByDateTimePosted(): Promise<JobResponseDto[]> {
    return (
      await this.prismaService.job.findMany({
        orderBy: { dateTimePosted: 'desc' },
      })
    ).map((job: Job) => this.mapToJobResponseDto(job));
  }

  public async retrieveJobsByJobTitle(
    title: string,
  ): Promise<JobResponseDto[]> {
    const jobs: Job[] = await this.prismaService.job.findMany({
      where: {
        title: { startsWith: title, mode: 'insensitive' },
      },
    });

    return jobs.map((job: Job) => this.mapToJobResponseDto(job));
  }

  public async createJob(
    createJobRequestDto: CreateJobRequestDto,
  ): Promise<JobResponseDto> {
    try {
      const job: Job = await this.prismaService.job.create({
        data: {
          ...createJobRequestDto,
        },
      });

      return this.mapToJobResponseDto(job);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('fields must be completed');
    }
  }

  public async updateJob(
    jobId: number,
    updateJobRequestDto: UpdateJobRequestDto,
  ): Promise<JobResponseDto> {
    try {
      const job: Job = await this.prismaService.job.update({
        where: {
          id: jobId,
        },
        data: {
          ...updateJobRequestDto,
        },
      });

      return this.mapToJobResponseDto(job);
    } catch (error) {
      throw new BadRequestException('fields must be completed');
    }
  }

  public async removeJob(jobId: number): Promise<void> {
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

  public async retrieveJob(jobId: number): Promise<JobResponseDto> {
    try {
      const job: Job = await this.prismaService.job.findUnique({
        where: { id: jobId },
      });

      return this.mapToJobResponseDto(job);
    } catch (error) {
      throw new NotFoundException('job does not exist');
    }
  }

  private mapToJobResponseDto(job: Job): JobResponseDto {
    const jobResponseDto: JobResponseDto = new JobResponseDto();

    jobResponseDto.id = job.id;
    jobResponseDto.city = job.city;
    jobResponseDto.companyName = job.companyName;
    jobResponseDto.country = job.country;
    jobResponseDto.description = job.description;
    jobResponseDto.position = job.position;
    jobResponseDto.postalCode = job.postalCode;
    jobResponseDto.province = job.province;
    jobResponseDto.requirements = job.requirements;
    jobResponseDto.street = job.street;
    jobResponseDto.title = job.title;
    jobResponseDto.dateTimePosted = job.dateTimePosted;

    return jobResponseDto;
  }
}
