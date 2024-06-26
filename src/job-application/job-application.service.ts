import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobStatus } from './enum';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserJobApplication } from '@prisma/client';
import {
  JobApplicationResponseDto,
  UpdateJobApplicationRequestDto,
} from './dto';
import { ResumeBuilderService } from 'src/resume-builder/resume-builder.service';
import { GeneratedResumeBuilder } from './pattern';
import { GeneratedResumeEntity } from './entity';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly resumeBuilderService: ResumeBuilderService,
  ) {}

  public async applyToJob(
    userId: number,
    jobId: number,
  ): Promise<JobApplicationResponseDto> {
    try {
      const resume = await this.prismaService.resume.findUnique({
        where: { userId },
      });

      if (!resume) throw new NotFoundException('resume not found');

      const job = await this.prismaService.job.findUnique({
        where: { id: jobId },
      });

      if (!job) throw new NotFoundException('job not found');

      const userJobApplication =
        await this.prismaService.userJobApplication.create({
          data: {
            userId,
            jobId,
            status: JobStatus.PENDING,
          },
        });

      const generatedResume: string =
        await this.resumeBuilderService.generateResume(resume, job);

      const generatedResumeEntity: GeneratedResumeEntity =
        await this.mapResumeContentToGeneratedResumeEntity(
          generatedResume,
          jobId,
          userId,
        );

      await this.prismaService.generatedResume.create({
        data: { ...generatedResumeEntity },
      });

      return userJobApplication;
    } catch (error) {
      console.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') throw new NotFoundException();
        if (error.code === 'P2002') throw new ConflictException();
      }
      throw new BadRequestException();
    }
  }

  public async retrieveJobApplications(): Promise<JobApplicationResponseDto[]> {
    return this.prismaService.userJobApplication.findMany({});
  }

  public async retrieveOwnJobApplications(
    userId: number,
  ): Promise<UserJobApplication[]> {
    try {
      const userJobApplications: UserJobApplication[] =
        await this.prismaService.userJobApplication.findMany({
          where: { userId: { equals: userId } },
        });

      return userJobApplications.map((userJobApplication: UserJobApplication) =>
        this.mapToJobApplicationResponseDto(userJobApplication),
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  public async updateJobApplication(
    updateJobApplicationRequestDto: UpdateJobApplicationRequestDto,
    jobStatus: string,
  ): Promise<JobApplicationResponseDto> {
    try {
      const userJobApplication: UserJobApplication =
        await this.prismaService.userJobApplication.update({
          where: {
            userId_jobId: {
              userId: updateJobApplicationRequestDto.userId,
              jobId: updateJobApplicationRequestDto.jobId,
            },
          },
          data: {
            status: jobStatus,
          },
        });

      return this.mapToJobApplicationResponseDto(userJobApplication);
    } catch (error) {
      console.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException();
        }
      }
      throw new BadRequestException();
    }
  }

  private mapToJobApplicationResponseDto(
    userJobApplication: UserJobApplication,
  ): JobApplicationResponseDto {
    const jobApplicationResponseDto: JobApplicationResponseDto =
      new JobApplicationResponseDto();

    jobApplicationResponseDto.status = userJobApplication.status;
    jobApplicationResponseDto.dateTimeApplied =
      userJobApplication.dateTimeApplied;
    jobApplicationResponseDto.dateTimeUpdated =
      userJobApplication.dateTimeUpdated;
    jobApplicationResponseDto.jobId = userJobApplication.jobId;
    jobApplicationResponseDto.userId = userJobApplication.userId;

    return jobApplicationResponseDto;
  }

  private async mapResumeContentToGeneratedResumeEntity(
    resumeContent: string,
    jobId: number,
    userId: number,
  ): Promise<GeneratedResumeEntity> {
    try {
      const content: string = resumeContent;

      const generatedResume: GeneratedResumeEntity =
        new GeneratedResumeBuilder()
          .setContent(content)
          .setUserJobApplicationJobId(jobId)
          .setUserJobApplicationUserId(userId)
          .build();

      return generatedResume;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
