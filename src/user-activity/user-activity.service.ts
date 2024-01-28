import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import { JobSearchedEvent, JobVisitedEvent } from '../job/event';
import { UserActivity } from '@prisma/client';

@Injectable()
export class UserActivityService {
  constructor(private prismaService: PrismaService) {}

  @OnEvent('job.visited', { async: true })
  private async handleJobVisitedEvent(
    jobVisitedEvent: JobVisitedEvent,
  ): Promise<UserActivity> {
    const jobsVisited: { jobsVisited: number[] } =
      await this.prismaService.userActivity.upsert({
        where: { userId: jobVisitedEvent.userId },
        create: { userId: jobVisitedEvent.userId },
        update: {},
        select: { jobsVisited: true },
      });

    const userActivity: UserActivity =
      await this.prismaService.userActivity.update({
        where: { userId: jobVisitedEvent.userId },
        data: {
          jobsVisited: {
            set: [...(jobsVisited?.jobsVisited ?? []), jobVisitedEvent.jobId],
          },
        },
      });

    return userActivity;
  }

  @OnEvent('job.searched', { async: true })
  private async handleSearchJobSearchEvent(
    jobSearchedEvent: JobSearchedEvent,
  ): Promise<UserActivity> {
    const searchHistory: { searchHistory: string[] } =
      await this.prismaService.userActivity.upsert({
        where: { userId: jobSearchedEvent.userId },
        create: { userId: jobSearchedEvent.userId },
        update: {},
        select: { searchHistory: true },
      });

    const userActivity: UserActivity =
      await this.prismaService.userActivity.update({
        where: { userId: jobSearchedEvent.userId },
        data: {
          searchHistory: {
            set: [
              ...(searchHistory?.searchHistory ?? []),
              jobSearchedEvent.searchedJob,
            ],
          },
        },
      });

    return userActivity;
  }
}
