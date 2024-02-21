import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivity } from '@prisma/client';
import { AuthGuard, RolesGuard } from '../auth/guard';
import { Role } from '../auth/enum';
import { Roles } from '../auth/decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/user-activities')
export class UserActivityController {
  public constructor(
    private readonly userActivityService: UserActivityService,
  ) {}

  @ApiResponse({ description: 'retrieves user activities' })
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  public retrieveUserActivities(
    // ! can't parsePipeInt since it expects numeric string even undeclared in the uri
    @Query('userId')
    userId: number,
  ): Promise<UserActivity[]> {
    if (!userId) return this.userActivityService.retrieveUserActivities();
    return this.userActivityService.retrieveUserActivitiesByUserId(userId);
  }
}
