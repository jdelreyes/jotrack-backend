import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveUsers() {
    return this.userService.retrieveUsers();
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  public updateUser() {
    return '';
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeUser() {
    return '';
  }
}
