import { Controller, Delete, Get, HttpCode, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  public retrieveUsers() {
    return this.userService.retrieveUsers();
  }

  @Put()
  @HttpCode(200)
  public updateUser() {
    return '';
  }

  @Delete()
  @HttpCode(204)
  public deleteUser() {
    return '';
  }
}
