import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobStatus } from './enum';

@Injectable()
export class JobApplicationService {
  constructor(private prismaService: PrismaService) {}

  public async applyJob(userId: number, jobId: number) {
    try {
      const userJobApplication =
        await this.prismaService.userJobApplication.create({
          data: {
            userId,
            jobId,
            status: JobStatus.PENDING,
          },
        });

      return userJobApplication;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  public async retrieveJobApplications() {
    return await this.prismaService.userJobApplication.findMany({});
  }

  public async retrieveOwnJobApplications(userId: number) {
    try {
      return await this.prismaService.userJobApplication.findMany({
        where: { userId: { equals: userId } },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
