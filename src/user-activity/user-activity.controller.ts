import { Controller } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';

@Controller('/api/user-activity')
export class UserActivityController {
  constructor(private userActivityService: UserActivityService) {}
}
