import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto, UserRequestDto, UserResponseDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async retrieveUsers(): Promise<UserResponseDto[]> {
    return (await this.prismaService.user.findMany()).map((user) =>
      this.mapToUserResponseDto(user),
    );
  }

  public async updateUser(
    userId: number,
    userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: { ...userRequestDto },
      });

      return this.mapToUserResponseDto(user);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public async removeUser(userId: number): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new NotFoundException('user does not exist');
    }
  }

  public async retrieveUser(userId: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('user does not exist');
    }
  }

  public async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ) {
    try {
      const hash: string = await argon.hash(changePasswordDto.password);

      await this.prismaService.user.update({
        where: { id: userId },
        data: { hash },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private mapToUserResponseDto(user: User) {
    const userResponseDto: UserResponseDto = new UserResponseDto();

    userResponseDto.id = user.id;
    userResponseDto.email = user.email;
    userResponseDto.firstName = user.firstName;
    userResponseDto.lastName = user.lastName;
    userResponseDto.phoneNumber = user.phoneNumber;

    return userResponseDto;
  }
}
