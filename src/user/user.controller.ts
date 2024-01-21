import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveUsers() {
    return this.userService.retrieveUsers();
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createUser() {
    return '';
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public updateUser() {
    return '';
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeUser() {
    return '';
  }
}
