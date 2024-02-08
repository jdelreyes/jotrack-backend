import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
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
  @Get('/:userId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  public retrieveUserActivities(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserActivity[]> {
    return this.userActivityService.retrieveUserActivities(userId);
  }
}
