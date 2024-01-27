import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, JwtGuard, RolesGuard } from 'src/auth/guard';
import { Role } from 'src/auth/enum';
import { User } from '@prisma/client';
import {
  ChangePasswordRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dto';
import { GetUser, Roles } from 'src/auth/decorator';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveUsers(): Promise<UserResponseDto[]> {
    return this.userService.retrieveUsers();
  }

  @UseGuards(AuthGuard, JwtGuard)
  @Put('/update-profile')
  @HttpCode(HttpStatus.OK)
  public updateProfile(
    @GetUser('id') userId: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateProfile(userId, updateUserRequestDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.userService.removeUser(userId);
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  public retrieveUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User> {
    return this.userService.retrieveUser(userId);
  }

  @UseGuards(AuthGuard, JwtGuard)
  @Put('/change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  public changePassword(
    @GetUser('id') userId: number,
    @Body() changePasswordRequestDto: ChangePasswordRequestDto,
  ): Promise<void> {
    return this.userService.changePassword(userId, changePasswordRequestDto);
  }
}
