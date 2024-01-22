import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleEnum } from 'src/auth/enum';
import { User } from '@prisma/client';
import { UserDto } from './dto';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveUsers(): Promise<User[]> {
    return this.userService.retrieveUsers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Put('/:userId')
  @HttpCode(HttpStatus.OK)
  public updateUser(
    @Param() params: { userId: string },
    @Body() userDto: UserDto,
  ): Promise<User> {
    return this.userService.updateUser(parseInt(params.userId, 10), userDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeUser(@Param() params: { userId: string }) {
    return this.userService.removeUser(parseInt(params.userId, 10));
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  public retrieveUser(@Param() params: { userId: string }): Promise<User> {
    return this.userService.retrieveUser(parseInt(params.userId));
  }
}
