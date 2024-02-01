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
import {
  ChangePasswordRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dto';
import { GetUser, Roles } from 'src/auth/decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ description: 'retrieves users' })
  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveUsers(): Promise<UserResponseDto[]> {
    return this.userService.retrieveUsers();
  }

  @ApiResponse({ description: 'updates own credentials' })
  @UseGuards(AuthGuard, JwtGuard)
  @Put('/update-profile')
  @HttpCode(HttpStatus.OK)
  public updateOwnCredentials(
    @GetUser('id') userId: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateOwnCredentials(userId, updateUserRequestDto);
  }

  @ApiResponse({ description: 'deletes a user' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.userService.removeUser(userId);
  }

  @ApiResponse({ description: 'retrieves a user' })
  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  public retrieveUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponseDto> {
    return this.userService.retrieveUser(userId);
  }

  @ApiResponse({ description: 'changes own password' })
  @UseGuards(AuthGuard, JwtGuard)
  @Put('/change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  public changeOwnPassword(
    @GetUser('id') userId: number,
    @Body() changePasswordRequestDto: ChangePasswordRequestDto,
  ): Promise<void> {
    return this.userService.changeOwnPassword(userId, changePasswordRequestDto);
  }
}
