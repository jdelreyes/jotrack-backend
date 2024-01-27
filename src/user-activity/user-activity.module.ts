import { Module } from '@nestjs/common';
import { UserActivityController } from './user-activity.controller';
import { UserActivityService } from './user-activity.service';

@Module({
  controllers: [UserActivityController],
  providers: [UserActivityService],
})
export class UserActivityModule {}
